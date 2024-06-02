package com.simpleboard.api.common;

public class ValidationConstants {

    // Validation Messages
    public static final String NOT_BLANK = "필수 입력 항목입니다.";
    public static final String AUTHOR_SIZE = "작성자는 4글자 이하로 입력해주세요.";
    public static final String PASSWORD_PATTERN_MESSAGE = "비밀번호는 4글자 이상 16글자 미만, 영문/숫자/특수문자가 포함되어야 합니다.";
    public static final String TITLE_SIZE = "제목은 100글자 미만으로 입력해주세요.";
    public static final String CONTENT_SIZE = "내용은 2000글자 미만으로 입력해주세요.";

    // Validation Patterns
    public static final String PASSWORD_PATTERN = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{4,15}$";
}
