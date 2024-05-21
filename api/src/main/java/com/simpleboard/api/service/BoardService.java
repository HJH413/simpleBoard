package com.simpleboard.api.service;

import com.simpleboard.api.domain.Board;
import com.simpleboard.api.domain.BoardComment;
import com.simpleboard.api.domain.BoardFile;
import com.simpleboard.api.repository.BoardCategoryRepository;
import com.simpleboard.api.repository.BoardCommentRepository;
import com.simpleboard.api.repository.BoardFileRepository;
import com.simpleboard.api.repository.BoardRepository;
import com.simpleboard.api.request.BoardDeleteRequest;
import com.simpleboard.api.request.BoardRequest;
import com.simpleboard.api.request.CommentRequest;
import com.simpleboard.api.request.PasswordRequest;
import com.simpleboard.api.response.BoardCategoryResponse;
import com.simpleboard.api.response.BoardDetailResponse;
import com.simpleboard.api.response.BoardListResponse;
import com.simpleboard.api.response.CommentResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardCategoryRepository boardCategoryRepository;
    private final BoardRepository boardRepository;
    private final BoardFileRepository boardFileRepository;
    private final BoardCommentRepository boardCommentRepository;

    @Value("${file.upload-dir}")
    private String path;

    public List<BoardCategoryResponse> getCategory() {

        return boardCategoryRepository.findAll()
                .stream()
                .map(boardCategory -> BoardCategoryResponse
                        .builder()
                        .boardCategory(boardCategory.getBoardCategory())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public Long saveBoard(BoardRequest postBoardRequest) {
        Board board = Board.builder()
                .boardCategory(postBoardRequest.getBoardCategory())
                .boardAuthor(postBoardRequest.getBoardAuthor())
                .boardPassword(postBoardRequest.getBoardPassword())
                .boardTitle(postBoardRequest.getBoardTitle())
                .boardContents(postBoardRequest.getBoardContents())
                .boardRegisTime(LocalDateTime.now())
                .build();

        Board saveBoard = boardRepository.save(board);

        if (postBoardRequest.getBoardFiles() != null && !postBoardRequest.getBoardFiles().isEmpty()) {
            for (MultipartFile multipartFile : postBoardRequest.getBoardFiles()) {
                String fileName = multipartFile.getOriginalFilename();

                if (fileName != null && !fileName.isEmpty()) {
                    String fileExtension = fileName.substring(fileName.lastIndexOf("."));
                    String serverFileName = UUID.randomUUID() + fileExtension;

                    BoardFile boardFile = BoardFile.builder()
                            .fileName(fileName)
                            .serverFileName(serverFileName)
                            .board(saveBoard)
                            .build();

                    boardFileRepository.save(boardFile);

                    try {
                        File file = new File(path + File.separator + serverFileName);
                        multipartFile.transferTo(file);
                    } catch (IOException e) {
                        log.error(e.getMessage());
                    }
                }
            }
        }

        return saveBoard.getBoardSeq();
    }

    public List<BoardListResponse> boardList(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Board> boardList = boardRepository.findAllByOrderByBoardSeqDesc(pageable);

        List<BoardListResponse> boardListResponse = new ArrayList<>();

        for (Board board : boardList) {
            boolean boardFileExist = boardFileRepository.existsByBoard(board);
            BoardListResponse boardResponse = BoardListResponse.builder()
                    .board(board)
                    .boardFileExist(boardFileExist)
                    .build();

            boardListResponse.add(boardResponse);
        }

        return boardListResponse;
    }

    @Transactional
    public BoardDetailResponse boardDetail(Long boardSeq) {
        Board board = boardRepository.findById(boardSeq)
                .orElseThrow(() -> new RuntimeException("Board not found with id " + boardSeq));
        board.incrementViews();
        boardRepository.save(board);

        return BoardDetailResponse.builder()
                .board(board)
                .build();
    }

    public ResponseEntity<Resource> downloadFile(String serverFileName) throws MalformedURLException {
        Path filePath = Paths.get(path).resolve(serverFileName).normalize();
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists()) {
            throw new RuntimeException("File not found " + serverFileName);
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @Transactional
    public List<CommentResponse> saveComment(CommentRequest commentRequest) {
        Board board = boardRepository.findById(commentRequest.getBoardSeq())
                .orElseThrow(() -> new RuntimeException("Board not found with id " + commentRequest.getBoardSeq()));

        BoardComment boardComment = BoardComment.builder()
                .commentAuthor(commentRequest.getCommentAuthor())
                .commentContent(commentRequest.getCommentContent())
                .commentRegTime(LocalDateTime.now())
                .board(board)
                .build();

        boardCommentRepository.save(boardComment);

        return boardCommentRepository.findByBoard(board)
                .stream()
                .map(comment -> CommentResponse
                        .builder()
                        .boardComment(comment)
                        .build())
                .collect(Collectors.toList());

    }

    public boolean passwordCheck(PasswordRequest passwordRequest) {
        return boardRepository.existsByBoardSeqAndBoardPassword(passwordRequest.getBoardSeq(), passwordRequest.getBoardPassword());
    }

    @Transactional
    public boolean deleteBoard(BoardDeleteRequest boardDeleteRequest) {
        Board board = boardRepository.findById(boardDeleteRequest.getBoardSeq())
                .orElseThrow(() -> new RuntimeException("Board not found with id " + boardDeleteRequest.getBoardSeq()));

        if (boardRepository.existsByBoardSeqAndBoardPassword(boardDeleteRequest.getBoardSeq(), boardDeleteRequest.getBoardPassword())) {
            boardRepository.delete(board);
            return !boardRepository.existsById(boardDeleteRequest.getBoardSeq());
        } else {
            throw new RuntimeException("Incorrect password for board id " + boardDeleteRequest.getBoardSeq());
        }
    }
}
