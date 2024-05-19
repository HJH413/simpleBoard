package com.simpleboard.api.service;

import com.simpleboard.api.domain.Board;
import com.simpleboard.api.domain.BoardCategory;
import com.simpleboard.api.domain.BoardFile;
import com.simpleboard.api.repository.BoardCategoryRepository;
import com.simpleboard.api.repository.BoardFileRepository;
import com.simpleboard.api.repository.BoardRepository;
import com.simpleboard.api.request.BoardRequest;
import com.simpleboard.api.response.BoardCategoryResponse;
import com.simpleboard.api.response.BoardDetailResponse;
import com.simpleboard.api.response.BoardResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardCategoryRepository boardCategoryRepository;
    private final BoardRepository boardRepository;
    private final BoardFileRepository boardFileRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public BoardCategoryResponse getCategory() {
        List<BoardCategory> boardCategoryList = boardCategoryRepository.findAll();

        return BoardCategoryResponse.builder()
                .boardCategoryList(boardCategoryList)
                .build();
    }

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
                        File file = new File(uploadDir + File.separator + serverFileName);
                        multipartFile.transferTo(file);
                    } catch (IOException e) {
                        log.error(e.getMessage());
                    }
                }
            }
        }

        return saveBoard.getBoardSeq();
    }

    public List<BoardResponse> boardList(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Board> boardList = boardRepository.findAll(pageable);

        List<BoardResponse> boardListResponse = new ArrayList<>();

        for (Board board : boardList) {
            boolean boardFileExist = boardFileRepository.existsByBoard(board);
            BoardResponse boardResponse = BoardResponse.builder()
                    .board(board)
                    .boardFileExist(boardFileExist)
                    .build();

            boardListResponse.add(boardResponse);
        }

        return boardListResponse;
    }

    public BoardDetailResponse boardDetail(Long boardSeq) {
        Board board = boardRepository.findById(boardSeq).orElseThrow();

        return BoardDetailResponse.builder()
                .board(board)
                .build();
    }

}
