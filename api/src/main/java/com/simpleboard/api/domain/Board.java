package com.simpleboard.api.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardSeq;

    @Column(length = 50, nullable = false)
    private String boardCategory;

    @Column(length = 12, nullable = false)
    private String boardAuthor;

    @Column(nullable = false)
    private String boardPassword;

    @Column(length = 300, nullable = false)
    private String boardTitle;

    @Column(length = 6000, nullable = false)
    private String boardContents;

    @Column(nullable = false)
    private int boardViews = 0;

    @Column(nullable = false)
    private LocalDateTime boardRegisTime;

    private LocalDateTime boardUpdateTime;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BoardFile> files = new ArrayList<>();

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BoardReply> replies = new ArrayList<>();

    @Builder
    public Board(String boardCategory, String boardAuthor, String boardPassword, String boardTitle, String boardContents, LocalDateTime boardRegisTime) {
        this.boardCategory = boardCategory;
        this.boardAuthor = boardAuthor;
        this.boardPassword = boardPassword;
        this.boardTitle = boardTitle;
        this.boardContents = boardContents;
        this.boardRegisTime = boardRegisTime;
    }
}
