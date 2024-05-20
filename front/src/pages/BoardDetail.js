import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {FaPaperclip} from "react-icons/fa";
import axios from "axios";

const BoardDetail = () => {
    const {boardSeq} = useParams();
    const [board, setBoard] = useState(null);

    const fetchBoard = (boardSeq) => {
        axios.get(`/api/detail/${boardSeq}`)
            .then((response) => {
                console.log(response.data)
                setBoard(response.data);
            })
            .catch(error => console.error(error));
    }

    const fileDownload = async (fileName, serverFileName) => {
        try {
            const response = await axios.get('/api/downloadFile',
                {
                    params: {
                        serverFileName: serverFileName
                    },
                    responseType: 'blob'
                });

            const blob = new Blob([response.data], {type: response.headers['content-type']});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchBoard(boardSeq);
    }, [boardSeq]);

    if (!board) {
        return <div>Loading...</div>;
    }

    return (
        <div className={"container"}>
            <div className={"board-header-container"}>
                <div>작성자: {board.boardAuthor}</div>
                <div>등록일시: {board.boardRegisTime} {board.boardUpdateTime != null ? `| 수정일시: ${board.boardUpdateTime}` : ""}</div>
            </div>
            <div className={"board-header-container"}>
                <div>
                    <h3>[{board.boardCategory}]&nbsp;&nbsp;&nbsp;{board.boardTitle}</h3>
                </div>
                <div>조회수: {board.boardViews}회</div>
            </div>
            <div className={"board-content-container"}>
                <div className={"board-textarea-container"}>
                    <textarea className={"content-textarea"} disabled value={board.boardContent}></textarea>
                </div>
                <div className={"board-file-container"}>
                    {board.boardFileList.map((value, index) => (
                        <div key={index}>
                            <span onClick={() => fileDownload(value.fileName, value.serverFileName)}>
                                <FaPaperclip/> {value.fileName}
                            </span>
                        </div>
                    ))}
                </div>
                <div className={"board-reply-container"}>
                    <div className={"reply-container"}>
                        <div className={"reply"}>
                            <span className={"reply-date"}>2024.05.17 16:44</span>
                            <p>
                                aaaaa1
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
