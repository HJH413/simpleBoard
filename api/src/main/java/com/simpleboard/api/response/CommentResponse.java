package com.simpleboard.api.response;

import com.simpleboard.api.common.BoardCommon;
import com.simpleboard.api.domain.BoardComment;
import lombok.Builder;
import lombok.Getter;

@Getter
public class CommentResponse {

    private final String commentAuthor;
    private final String commentContent;
    private final String commentRegTime;

    @Builder
    public CommentResponse(BoardComment boardComment) {
        this.commentAuthor = boardComment.getCommentAuthor();
        this.commentContent = boardComment.getCommentContent();
        this.commentRegTime = BoardCommon.formatDateTime(boardComment.getCommentRegTime());
    }
}
