import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {FaPaperclip} from "react-icons/fa";
import axios from "axios";

const BoardList = () => {
    const [boardCategoryList, setBoardCategoryList] = useState([]);
    const [boards, setBoards] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [category, setCategory] = useState("");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [boardsData, setBoardsData] = useState([]);
    const [pagingHtml, setPagingHtml] = useState([]);
    const [pagingPrev, setPagingPrev] = useState(false);
    const [pagingNext, setPagingNext] = useState(false);

    const fetchBoardPage = (page) => {
        let params = {
            "page" : page,
            "startDate" : startDate,
            "endDate" : endDate,
            "category" : category,
            "searchText" : searchText
        };

        axios.get(`/api/board`, {params})
            .then(response => {
                setBoardsData(response.data);
                setBoards(response.data.boardList);

                paging(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const paging = (boardsData) => {
        const currentPage = boardsData.currentPage;
        const totalPages = boardsData.totalPages;

        let pageList = [];
        if (currentPage + 1 > 1 && currentPage + 1 < totalPages) {
            setPagingPrev(true);
            setPagingNext(true);
        } else if (currentPage + 1 === 1) {
            setPagingPrev(false);
            setPagingNext(true);
        } else if (currentPage + 1 === totalPages) {
            setPagingPrev(true);
            setPagingNext(false);
        }

        if (totalPages <= 10) {
            for (let i = 0; i < totalPages; i++) {
                pageList.push(i);
            }

            const pagingElements = pageList.map((value) => {
                if (currentPage === value) {
                    return (
                        <div key={value} onClick={() => setCurrentPage(value)}>
                            <b>{value + 1}</b>
                        </div>
                    );
                } else {
                    return (
                        <div key={value} onClick={() => setCurrentPage(value)}>
                            {value + 1}
                        </div>
                    );
                }
            });

            setPagingHtml(pagingElements);
        } else {
            // todo : 페이지 10개씩 자르기
            for (let i = 0; i < totalPages; i++) {
                pageList.push(i);
            }

            const pagingElements = pageList.map((value) => {
                if (currentPage === value) {
                    return (
                        <div key={value} onClick={() => setCurrentPage(value)}>
                            <b>{value + 1}</b>
                        </div>
                    );
                } else {
                    return (
                        <div key={value} onClick={() => setCurrentPage(value)}>
                            {value + 1}
                        </div>
                    );
                }
            });

            setPagingHtml(pagingElements);
        }
    };

    const buttonPaging = (type) => {
        const currentPage = boardsData.currentPage;

        if (type === "prev") {
            fetchBoardPage(currentPage - 1);
        } else {
            fetchBoardPage(currentPage + 1);
        }
    }

    const search = (event) => {
        event.preventDefault();

        if (endDate !== '') {
            if (endDate < startDate) {
                alert("시작일은 종료일 보다 클 수 없습니다.");
                return;
            }
        }

        fetchBoardPage(0);
    }

    useEffect(() => {
        fetchBoardPage(currentPage);
    }, [currentPage]);

    useEffect(() => {
        axios.get("/api/category")
            .then(response => {
                setBoardCategoryList(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className={"container"}>
            <div className={"search-container"}>
                <form className="search-form">
                    <div className="form-group">
                        <label htmlFor="startDate">등록일:</label>
                        <input type="date" id="startDate" onChange={event => setStartDate(event.target.value)}/>
                        <span>~</span>
                        <input type="date" id="endDate" onChange={event => setEndDate(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">카테고리:</label>
                        <select id="category" onChange={event => setCategory(event.target.value)}>
                            <option value={""}>--선택--</option>
                            {boardCategoryList.map((value, index) => (
                                <option key={index} value={value.boardCategory}>{value.boardCategory}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="search">제목 검색:</label>
                        <input type="text" id="search" onChange={event => setSearchText(event.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-search" onClick={search}>검색</button>
                </form>
            </div>
            <div className={"table-container"}>
                총 {boardsData.totalElements}건
                <table className={"board-table"}>
                    <colgroup>
                        <col width={"10%"}/>
                        <col width={"5%"}/>
                        <col width={"45%"}/>
                        <col width={"5%"}/>
                        <col width={"5%"}/>
                        <col width={"15%"}/>
                        <col width={"15%"}/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>카테고리</th>
                        <th>파일</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>등록 일시</th>
                        <th>수정 일시</th>
                    </tr>
                    </thead>
                    <tbody>
                    {boards.length > 0 ? boards.map((board, index) => (
                            <tr key={index}>
                                <td>{board.boardCategory}</td>
                                <td>{board.boardFileExist ? <FaPaperclip/> : "-"}</td>
                                <td><Link to={`/Detail/${board.boardSeq}`}>{board.boardTitle}</Link></td>
                                <td>{board.boardAuthor}</td>
                                <td>{board.boardViews}</td>
                                <td>{board.boardRegisTime}</td>
                                <td>{board.boardUpdateTime !== null ? board.boardUpdateTime : "-"}</td>
                            </tr>
                        ))
                        :
                        <tr>
                            <td colSpan={7}>조회된 결과가 없습니다.</td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
            <div className={"footer-container"}>
                <div className={"paging-container"}>
                    {pagingPrev ?
                        <div className={"paging-button"} onClick={() => buttonPaging('prev')}>&lt;&nbsp;</div> : null}

                    <div className={"paging"}>
                        {pagingHtml}
                    </div>

                    {pagingNext ?
                        <div className={"paging-button"} onClick={() => buttonPaging('next')}>&nbsp;&gt;</div> : null}
                </div>
                <div className={"write-container"}>
                    <Link to="/Write">
                        <div className={"button-container"}>
                            <button className="btn btn-write">작성</button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BoardList;
