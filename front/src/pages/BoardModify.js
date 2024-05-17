import {Link} from "react-router-dom";
import React from "react";

const BoardModify = () => {
    return (
        <div className={"container"}>
            <form>
                <div className={"form-container"}>
                    <div className="form-group2">
                        <label htmlFor="category">카테고리 : JAVA</label>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="category">등록일시 : 2024.05.17 11:15</label>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="category">수정일시 : 2024.05.18 11:15</label>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="category">조회수 : 10</label>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="author">작성자 *</label>
                        <input type="text" id="author" />
                    </div>
                    <div className="form-group2">
                        <label htmlFor="password">비밀번호 *</label>
                        <input type="password" id="password" />
                    </div>
                    <div className="form-group2">
                        <label htmlFor="title">제목 *</label>
                        <input type="text" id="title" />
                    </div>
                    <div className="form-group2">
                        <label htmlFor="content">내용 *</label>
                        <textarea id="content"></textarea>
                    </div>
                    <div className="form-group2">
                        <label>파일 첨부</label>
                        <div className="file-upload">
                            <input type="file" />
                            <button type="button">파일 찾기</button>
                        </div>
                        <div className="file-upload">
                            <input type="file" />
                            <button type="button">파일 찾기</button>
                        </div>
                        <div className="file-upload">
                            <input type="file" />
                            <button type="button">파일 찾기</button>
                        </div>
                    </div>
                </div>
                <div className={"footer-container"}>
                    <div className={"footer-btn-container"}>
                        <Link to="/">
                            <button className={"btn btn-cancel"}>취소</button>
                        </Link>
                        <button className={"btn btn-save"}>저장</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default BoardModify;