package com.simpleboard.api.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileSeq;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String serverFileName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_seq", nullable = false)
    private Board board;

    @Builder
    public BoardFile(String fileName, String serverFileName, Board board) {
        this.fileName = fileName;
        this.serverFileName = serverFileName;
        this.board = board;
    }
}
