package com.simpleboard.api.repository;

import com.simpleboard.api.domain.Board;
import com.simpleboard.api.domain.BoardFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardFileRepository extends JpaRepository<BoardFile, Long> {

    boolean existsByBoard(Board board);
}
