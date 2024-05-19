package com.simpleboard.api.response;


import com.simpleboard.api.domain.BoardCategory;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class BoardCategoryResponse {

    private final List<String> boardCategoryList;

    @Builder
    public BoardCategoryResponse(List<BoardCategory> boardCategoryList) {
        this.boardCategoryList = new ArrayList<>();

        for (BoardCategory boardCategory : boardCategoryList) {
            this.boardCategoryList.add(boardCategory.getBoardCategory());
        }
    }
}
