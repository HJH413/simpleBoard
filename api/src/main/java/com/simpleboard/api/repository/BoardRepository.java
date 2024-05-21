package com.simpleboard.api.repository;

import com.simpleboard.api.domain.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    Page<Board> findAllByOrderByBoardSeqDesc(Pageable pageable);

    boolean existsByBoardSeqAndBoardPassword(Long boardSeq, String boardPassword);
}
