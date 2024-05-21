package com.simpleboard.api.request;

import lombok.Getter;

@Getter
public class BoardDeleteRequest {

    private Long boardSeq;
    private String boardPassword;
}
