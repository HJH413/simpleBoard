package com.simpleboard.api.repository;

import com.simpleboard.api.domain.Board;
import com.simpleboard.api.domain.BoardComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardCommentRepository extends JpaRepository<BoardComment, Long> {

   List<BoardComment> findByBoard(Board board);
}
