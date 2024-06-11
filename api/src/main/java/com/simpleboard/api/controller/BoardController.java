package com.simpleboard.api.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.simpleboard.api.request.*;
import com.simpleboard.api.response.*;
import com.simpleboard.api.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping(value = "/category")
    private List<BoardCategoryResponse> getCategory() {
        return boardService.getCategory();
    }

    @GetMapping(value = "/board")
    private Map<String, Object> boardList(@ModelAttribute("boardListRequest") BoardListRequest boardListRequest) {
        Page<BoardListResponse> boardPage = boardService.boardList(boardListRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("totalElements", boardPage.getTotalElements());
        response.put("totalPages", boardPage.getTotalPages());
        response.put("currentPage", boardListRequest.getPage());
        response.put("boardList", boardPage.getContent());

        return response;
    }

    @GetMapping(value = "/detail/{boardSeq}")
    private BoardDetailResponse boardDetail(@PathVariable Long boardSeq) {
        return boardService.boardDetail(boardSeq);
    }

    @PostMapping(value = "/board")
    private Long saveBoard(@RequestPart("boardCategory") String boardCategory,
                           @RequestPart("boardAuthor") String boardAuthor,
                           @RequestPart("boardPassword") String boardPassword,
                           @RequestPart("boardTitle") String boardTitle,
                           @RequestPart("boardContents") String boardContents,
                           @RequestPart(value = "boardFiles", required = false) List<MultipartFile> boardFiles) {

        BoardSaveRequest boardRequest = BoardSaveRequest.builder()
                .boardCategory(boardCategory)
                .boardAuthor(boardAuthor)
                .boardPassword(boardPassword)
                .boardTitle(boardTitle)
                .boardContents(boardContents)
                .boardFiles(boardFiles)
                .build();

        return boardService.saveBoard(boardRequest);
    }

    @GetMapping(value = "/downloadFile")
    private ResponseEntity<Resource> downloadFile(@RequestParam String serverFileName) throws MalformedURLException {
        return boardService.downloadFile(serverFileName);
    }

    @PostMapping(value = "/comment")
    private List<CommentResponse> saveComment(@RequestBody CommentRequest commentRequest) {
        return boardService.saveComment(commentRequest);
    }

    @PostMapping(value = "/password")
    private PasswordResponse password(@RequestBody PasswordRequest passwordRequest) {
        return boardService.password(passwordRequest);
    }

    @DeleteMapping(value = "/board")
    private boolean deleteBoard(@RequestBody BoardDeleteRequest boardDeleteRequest) throws Exception {
        return boardService.deleteBoard(boardDeleteRequest);
    }

    @PostMapping(value = "/modify")
    private Long modifyBoard(@RequestPart("boardSeq") String boardSeq,
                             @RequestPart("boardAuthor") String boardAuthor,
                             @RequestPart("boardPassword") String boardPassword,
                             @RequestPart("boardTitle") String boardTitle,
                             @RequestPart("boardContent") String boardContent,
                             @RequestParam("boardDeleteFilesJson") String boardDeleteFilesJson,
                             @RequestPart(value = "boardFiles", required = false) List<MultipartFile> boardFiles) {

        ObjectMapper objectMapper = new ObjectMapper();
        List<Map<String, String>> boardDeleteFiles;

        try {
            boardDeleteFiles = objectMapper.readValue(boardDeleteFilesJson, new TypeReference<List<Map<String, String>>>() {
            });
        } catch (Exception e) {

            return null;
        }


        BoardModifyRequest boardModifyRequest = BoardModifyRequest.builder()
                .boardSeq(Long.valueOf(boardSeq))
                .boardAuthor(boardAuthor)
                .boardPassword(boardPassword)
                .boardTitle(boardTitle)
                .boardContents(boardContent)
                .boardDeleteFiles(boardDeleteFiles)
                .boardFiles(boardFiles)
                .build();


        return boardService.modifyBoard(boardModifyRequest);
    }
}
