package com.simpleboard.api.specification;

import com.simpleboard.api.domain.Board;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;

public class BoardSpecification {

    public static Specification<Board> hasBoardCategory(String boardCategory) {
        return (root, query, criteriaBuilder) -> {
            if ("".equals(boardCategory)) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("boardCategory"), boardCategory);
        };
    }

    public static Specification<Board> hasSearchText(String searchText) {
        return (root, query, criteriaBuilder) -> {
            if ("".equals(searchText)) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.like(root.get("boardTitle"), "%" + searchText + "%");
        };
    }

    public static Specification<Board> betweenDates(String startDate, String endDate) {
        return (root, query, criteriaBuilder) -> {
            if ("".equals(startDate) && "".equals(endDate)) {
                return criteriaBuilder.conjunction();
            }

            LocalDateTime startDateTime = null;
            LocalDateTime endDateTime = null;

            try {
                if (!"".equals(startDate)) {
                    startDateTime = LocalDate.parse(startDate).atStartOfDay();
                }
                if (!"".equals(endDate)) {
                    endDateTime = LocalDate.parse(endDate).atTime(23, 59, 59);
                }
            } catch (DateTimeParseException e) {
                throw new IllegalArgumentException("Invalid date format. Please use 'yyyy-MM-dd'.", e);
            }

            if (!"".equals(startDate) &&  !"".equals(endDate)) {
                return criteriaBuilder.between(root.get("boardRegisTime"), startDateTime, endDateTime);
            } else if (!"".equals(startDate)) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("boardRegisTime"), startDateTime);
            } else  {
                return criteriaBuilder.lessThanOrEqualTo(root.get("boardRegisTime"), endDateTime);
            }
        };
    }


}
