package com.simpleboard.api.response;


import lombok.Builder;
import lombok.Getter;

@Getter
public class BoardCategoryResponse {

    private final String boardCategory;

    @Builder
    public BoardCategoryResponse(String boardCategory) {
        this.boardCategory = boardCategory;
    }
}
