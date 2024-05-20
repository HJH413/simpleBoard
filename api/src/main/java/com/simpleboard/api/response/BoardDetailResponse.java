package com.simpleboard.api.response;

import com.simpleboard.api.common.BoardCommon;
import com.simpleboard.api.domain.Board;
import com.simpleboard.api.domain.BoardFile;
import com.simpleboard.api.domain.BoardComment;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class BoardDetailResponse {

    private final Long boardSeq;
    private final String boardAuthor;
    private final String boardRegisTime;
    private final String boardUpdateTime;
    private final String boardCategory;
    private final String boardTitle;
    private final int boardViews;
    private final String boardContent;
    private final List<BoardFile> boardFiles;
    private final List<BoardComment> boardComments;

    @Builder
    public BoardDetailResponse(Board board) {
        this.boardSeq = board.getBoardSeq();
        this.boardAuthor = board.getBoardAuthor();
        this.boardRegisTime = BoardCommon.formatDateTime(board.getBoardRegisTime());
        this.boardUpdateTime =  BoardCommon.formatDateTime(board.getBoardUpdateTime());
        this.boardCategory = board.getBoardCategory();
        this.boardTitle = board.getBoardTitle();
        this.boardViews = board.getBoardViews();
        this.boardContent = board.getBoardContents();
        this.boardFiles = board.getBoardFiles();
        this.boardComments = board.getBoardComments();
    }
}
