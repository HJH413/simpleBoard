import React from 'react';
import {Link} from 'react-router-dom';
import {FaPaperclip } from "react-icons/fa";

const BoardList = () => {
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
                            <option>전체 카테고리</option>
                            <option>전체 카테고리</option>
                            <option>전체 카테고리</option>
                            <option>전체 카테고리</option>
                            <option>전체 카테고리</option>
                            <option>전체 카테고리</option>
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
                총 500건
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

                    <tr>
                        <td>JAVA</td>
                        <td><FaPaperclip/></td>
                        <td>기나긴제목입니다ㅏ다다다다다다다다</td>
                        <td>김땡땡</td>
                        <td>100,000</td>
                        <td>2024-05-16 11:09</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>JAVA</td>
                        <td></td>
                        <td>기나긴제목입니다ㅏ다다다다다다다다</td>
                        <td>김땡땡</td>
                        <td>100,000</td>
                        <td>2024-05-16 11:09</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>JAVA</td>
                        <td><FaPaperclip/></td>
                        <td>기나긴제목입니다ㅏ다다다다다다다다</td>
                        <td>김땡땡</td>
                        <td>100,000</td>
                        <td>2024-05-16 11:09</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>JAVA</td>
                        <td><FaPaperclip/></td>
                        <td>기나긴제목입니다ㅏ다다다다다다다다</td>
                        <td>김땡땡</td>
                        <td>100,000</td>
                        <td>2024-05-16 11:09</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>JAVA</td>
                        <td></td>
                        <td>기나긴제목입니다ㅏ다다다다다다다다</td>
                        <td>김땡땡</td>
                        <td>100,000</td>
                        <td>2024-05-16 11:09</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>JAVA</td>
                        <td></td>
                        <td>기나긴제목입니다ㅏ다다다다다다다다</td>
                        <td>김땡땡</td>
                        <td>100,000</td>
                        <td>2024-05-16 11:09</td>
                        <td>-</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className={"footer-container"}>
                <div className={"paging-container"}>
                    <div className={"paging"}>
                        1, 2, 3, 4, 5, 6, 7, 8, 9, >, >>
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
