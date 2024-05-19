package com.simpleboard.api.response;

import com.simpleboard.api.common.BoardCommon;
import com.simpleboard.api.domain.Board;
import lombok.Builder;
import lombok.Getter;

@Getter
public class BoardDetailResponse {
    private final String boardAuthor;
    private final String boardRegisTime;
    private final String boardUpdateTime;
    private final String boardCategory;
    private final String boardTitle;
    private final int boardViews;
    private final String boardContent;

    @Builder
    public BoardDetailResponse(Board board) {
        this.boardAuthor = board.getBoardAuthor();
        this.boardRegisTime = BoardCommon.formatDateTime(board.getBoardRegisTime());
        this.boardUpdateTime =  BoardCommon.formatDateTime(board.getBoardUpdateTime());
        this.boardCategory = board.getBoardCategory();
        this.boardTitle = board.getBoardTitle();
        this.boardViews = board.getBoardViews();
        this.boardContent = board.getBoardContents();
    }
}
