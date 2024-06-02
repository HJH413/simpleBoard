package com.simpleboard.api.request;

import com.simpleboard.api.common.ValidationConstants;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Builder
public class BoardSaveRequest {

    @NotBlank(message = ValidationConstants.NOT_BLANK)
    private String boardCategory;

    @NotBlank(message = ValidationConstants.NOT_BLANK)
    @Size(max = 4, message = ValidationConstants.AUTHOR_SIZE)
    private String boardAuthor;

    @NotBlank(message = ValidationConstants.NOT_BLANK)
    @Pattern(regexp = ValidationConstants.PASSWORD_PATTERN, message = ValidationConstants.PASSWORD_PATTERN_MESSAGE)
    private String boardPassword;

    @NotBlank(message = ValidationConstants.NOT_BLANK)
    @Size(max = 99, message = ValidationConstants.TITLE_SIZE)
    private String boardTitle;

    @NotBlank(message = ValidationConstants.NOT_BLANK)
    @Size(max = 1999, message = ValidationConstants.CONTENT_SIZE)
    private String boardContents;

    private List<MultipartFile> boardFiles;
}
