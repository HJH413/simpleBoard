package com.simpleboard.api.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonManagedReference
    private List<BoardFile> files = new ArrayList<>();

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<BoardReply> replies = new ArrayList<>();

    @Builder
    public Board(String boardCategory, String boardAuthor, String boardPassword, String boardTitle, String boardContents, int boardViews, LocalDateTime boardRegisTime, LocalDateTime boardUpdateTime) {
        this.boardCategory = boardCategory;
        this.boardAuthor = boardAuthor;
        this.boardPassword = boardPassword;
        this.boardTitle = boardTitle;
        this.boardContents = boardContents;
        this.boardViews = boardViews;
        this.boardRegisTime = boardRegisTime;
        this.boardUpdateTime = boardUpdateTime;
    }

    public void incrementViews() {
        this.boardViews += 1;
    }
}
