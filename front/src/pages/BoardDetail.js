import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {FaPaperclip } from "react-icons/fa";
import axios from "axios";

const BoardDetail = () => {
    const { boardSeq } = useParams();
    const [board, setBoard] = useState(null);

    console.log(boardSeq)

    useEffect(() => {
        axios.get(`/api/Detail/${boardSeq}`)
            .then(response =>
            console.log(response))
            .catch(error => console.log(error))
    }, [boardSeq]);

    return (
        <div className={"container"}>
            <div className={"board-header-container"}>
                <div>작성자</div>
                <div>등록일시 2024.05.17 12:32 수정일시 2024.05.18 12:32</div>
            </div>
            <div className={"board-header-container"}>
                <div>
                    <h3>[카테고리]&nbsp;&nbsp;&nbsp;제목</h3>
                </div>
                <div>조회수:500회</div>
            </div>
            <div className={"board-content-container"}>
                <div className={"board-textarea-container"}>
                    <textarea className={"content-textarea"} disabled>
                        게시판 내용이 출력됩니다!!!!!!!!!!!!!!
                        게시판 내용이 출력됩니다!!!!!!!!!!!!!!
                        게시판 내용이 출력됩니다!!!!!!!!!!!!!!
                        게시판 내용이 출력됩니다!!!!!!!!!!!!!!
                        게시판 내용이 출력됩니다!!!!!!!!!!!!!!
                        게시판 내용이 출력됩니다!!!!!!!!!!!!!!
                        게시판 내용이 출력됩니다!!!!!!!!!!!!!!
                        게시판 내용이 출력됩니다!!!!!!!!!!!!!!
                    </textarea>
                </div>
                <div className={"board-file-container"}>
                    <div><FaPaperclip/>파일1</div>
                    <div><FaPaperclip/>파일2</div>
                    <div><FaPaperclip/>파일3</div>
                </div>
                <div className={"board-reply-container"}>
                    <div className={"reply-container"}>
                        <div className={"reply"}>
                            <span className={"reply-date"}>2024.05.17 16:44</span>
                            <p>
                                aaaaa1
                            </p>
                        </div>
                        <div className={"reply"}>
                            <span className={"reply-date"}>2024.05.17 16:44</span>
                            <p>
                                aaaaa2
                            </p>
                        </div>
                    </div>
                    <div className={"reply-btn-container"}>
                        <button className={"btn btn-save"}>더보기</button>
                    </div>
                    <form className={"reply-textarea-container"}>
                        <textarea className={"reply-textarea"} placeholder={"댓글을 입력해 주세요."}></textarea>
                        <button className={"btn btn-write"}>등록</button>
                    </form>
                </div>
            </div>
            <div className={"footer-container"}>
                <div className={"footer-btn-container"}>
                    <Link to="/">
                        <button className={"btn btn-search"}>목록</button>
                    </Link>
                    <Link to="/Modify">
                        <button className={"btn btn-write"}>수정</button>
                    </Link>
                    <button className={"btn btn-delete"}>삭제</button>
                </div>
            </div>
        </div>
    );
}

export default BoardDetail;
