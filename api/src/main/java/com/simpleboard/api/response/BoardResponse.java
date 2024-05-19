package com.simpleboard.api.response;

import com.simpleboard.api.common.BoardCommon;
import com.simpleboard.api.domain.Board;
import lombok.Builder;
import lombok.Getter;
@Getter
public class BoardResponse {
    private final String boardCategory;
    private final String boardTitle;
    private final String boardAuthor;
    private final int boardViews;
    private final String boardRegisTime;
    private final String boardUpdateTime;
    private final boolean boardFileExist;

    @Builder
    public BoardResponse(Board board, boolean boardFileExist) {
        this.boardCategory = board.getBoardCategory();
        this.boardFileExist = boardFileExist;
        this.boardTitle = board.getBoardTitle().length() > 80 ? board.getBoardTitle().substring(0, 80) + "..." : board.getBoardTitle();
        this.boardAuthor = board.getBoardAuthor();
        this.boardViews = board.getBoardViews();
        this.boardRegisTime = BoardCommon.formatDateTime(board.getBoardRegisTime());
        this.boardUpdateTime =  BoardCommon.formatDateTime(board.getBoardUpdateTime());
    }
}
