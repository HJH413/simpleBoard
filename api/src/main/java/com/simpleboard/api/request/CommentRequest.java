package com.simpleboard.api.request;

import lombok.Getter;

@Getter
public class CommentRequest {

    private Long boardSeq;
    private String commentAuthor;
    private String commentContent;
}
