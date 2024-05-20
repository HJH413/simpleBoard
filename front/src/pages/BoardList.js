import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {FaPaperclip} from "react-icons/fa";
import axios from "axios";

const BoardList = () => {
    const [boardCategoryList, setBoardCategoryList] = useState([]);
    const [boards, setBoards] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const fetchBoardPage = (page) => {
        axios.get(`/api/board/${page}`)
            .then(response => {
                setBoards(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchBoardPage(currentPage);
    }, [currentPage]);

    useEffect(() => {
        axios.get("/api/category")
            .then(response => {
                setBoardCategoryList(response.data.boardCategoryList);
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    return (
        <div className={"container"}>
            <div className={"search-container"}>
                <form className="search-form">
                    <div className="form-group">
                        <label htmlFor="start-date">등록일:</label>
                        <input type="date" id="start-date"/>
                        <span>~</span>
                        <input type="date" id="end-date"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">카테고리:</label>
                        <select id="category">
                            {boardCategoryList.map((value, index) => (
                                <option key={index} value={value}>{value}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="search">검색어:</label>
                        <input type="text" id="search"/>
                    </div>
                    <button type="submit" className="btn btn-search">검색</button>
                </form>
            </div>
            <div className={"table-container"}>
                총 N건
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
                                <td><Link to={`/Detail/${board.boardSeq}`}>{board.boardTitle} // {board.boardSeq}</Link></td>
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
                    <div className={"paging"}>
                        <div onClick={event => setCurrentPage(0)}>1</div>
                        <div onClick={event => setCurrentPage(1)}>2</div>
                    </div>
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
