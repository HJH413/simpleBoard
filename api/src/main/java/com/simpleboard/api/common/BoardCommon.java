package com.simpleboard.api.common;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


public class BoardCommon {
    public static String formatDateTime(LocalDateTime dateTime) {
        if (dateTime == null) {
            return null;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm");
        return dateTime.format(formatter);
    }
}
