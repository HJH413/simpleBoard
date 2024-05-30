package com.simpleboard.api.request;

import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Builder
public class BoardSaveRequest {

    private String boardCategory;
    private String boardAuthor;
    private String boardPassword;
    private String boardTitle;
    private String boardContents;
    private List<MultipartFile> boardFiles;
}
