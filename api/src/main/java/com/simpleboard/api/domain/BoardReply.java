package com.simpleboard.api.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardReply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replySeq;

    @Column(length = 3000, nullable = false)
    private String replyContent;

    @Column(nullable = false)
    private LocalDateTime replyRegTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "borad_seq", nullable = false)
    private Board board;
}
