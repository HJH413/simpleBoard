package com.simpleboard.api.controller;

import com.simpleboard.api.request.BoardRequest;
import com.simpleboard.api.response.BoardCategoryResponse;
import com.simpleboard.api.response.BoardDetailResponse;
import com.simpleboard.api.response.BoardResponse;
import com.simpleboard.api.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping(value = "/category")
    private BoardCategoryResponse getCategory() {
        return boardService.getCategory();
    }

    @GetMapping(value = "/board/{page}")
    private List<BoardResponse> boardList(@PathVariable int page) {
        return boardService.boardList(page, 10);
    }

    @GetMapping(value = "/Detail/{boardSeq}")
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

        BoardRequest boardRequest = BoardRequest.builder()
                .boardCategory(boardCategory)
                .boardAuthor(boardAuthor)
                .boardPassword(boardPassword)
                .boardTitle(boardTitle)
                .boardContents(boardContents)
                .boardFiles(boardFiles)
                .build();

        return boardService.saveBoard(boardRequest);
    }


}
