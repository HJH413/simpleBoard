package com.simpleboard.api.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentSeq;

    @Column(length = 12, nullable = false)
    private String commentAuthor;

    @Column(length = 3000, nullable = false)
    private String commentContent;

    @Column(nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd HH:mm")
    private LocalDateTime commentRegTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "borad_seq", nullable = false)
    @JsonBackReference
    private Board board;

    @Builder
    public BoardComment(String commentAuthor, String commentContent, LocalDateTime commentRegTime, Board board) {
        this.commentAuthor = commentAuthor;
        this.commentContent = commentContent;
        this.commentRegTime = commentRegTime;
        this.board = board;
    }
}
