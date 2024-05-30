package com.simpleboard.api.request;

import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Getter
@Builder
public class BoardModifyRequest {

    private Long boardSeq;
    private String boardAuthor;
    private String boardPassword;
    private String boardTitle;
    private String boardContents;
    private List<Map<String, String>> boardDeleteFiles;
    private List<MultipartFile> boardFiles;
}
