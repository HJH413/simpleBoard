import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {FaPaperclip} from "react-icons/fa";
import axios from "axios";

const BoardDetail = () => {
    const {boardSeq} = useParams();
    const [board, setBoard] = useState(null);
    const [commentAuthor, setCommentAuthor] = useState(""); // 댓글 작성자
    const [commentContent, setCommentContent] = useState(""); // 댓글 내용
    const [boardComments, setBoardComments] = useState([]); // 댓글 목록

    const fetchBoard = (boardSeq) => {
        axios.get(`/api/detail/${boardSeq}`)
            .then((response) => {
                setBoard(response.data);
                setBoardComments(response.data.boardComments);
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

    const saveComment = (event) => {
        event.preventDefault();

        if (commentAuthor.length === 0) {
            alert("댓글 작성자를 작성하세요.")
            return;
        }

        if (commentContent.length === 0) {
            alert("댓글 내용을 작성하세요.")
            return;
        }

        axios.post("/api/comment",
            {
                'boardSeq': boardSeq,
                'commentAuthor': commentAuthor,
                'commentContent': commentContent
            })
            .then(response => {
                    setBoardComments(response.data);
                    document.getElementById("commentAuthor").value = "";
                    document.getElementById("commentContent").value = "";
                    setCommentAuthor('');
                    setCommentContent('');
                }
            )
            .catch(error => console.error(error));
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
                    {board.boardFiles.map((value, index) => (
                        <div key={index}>
                            <span onClick={() => fileDownload(value.fileName, value.serverFileName)}>
                                <FaPaperclip/> {value.fileName}
                            </span>
                        </div>
                    ))}
                </div>
                <div className={"board-comment-container"}>
                    <div className={"comment-container"}>
                        {boardComments.map((value, index) => (
                            <div className={"comment"} key={index}>
                                <span
                                    className={"comment-date"}>작성자: {value.commentAuthor} | 등록일시: {value.commentRegTime}</span>
                                <p>
                                    {value.commentContent}
                                </p>
                            </div>
                        ))}

                    </div>

                    <div className={"comment-btn-container"}>
                        <button className={"btn btn-save"}>더보기</button>
                    </div>
                    <div>
                        <form>
                            <div>
                                작성자 : <input type={"text"} id={"commentAuthor"}
                                             onChange={e => setCommentAuthor(e.target.value)} maxLength={5}/>
                            </div>
                            <div className={"comment-textarea-container"}>
                                <textarea id={"commentContent"} className={"comment-textarea"}
                                          placeholder={"댓글을 입력해 주세요."}
                                          onChange={e => setCommentContent(e.target.value)}></textarea>
                                <button className={"btn btn-write"} onClick={saveComment}>등록</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            <div className={"footer-container"}>
                <div className={"footer-btn-container"}>
                    <Link to="/">
                        <button className={"btn btn-search"}>목록</button>
                    </Link>
                    <Link to="/PasswordCheck" state={{ boardSeq: boardSeq, state: "modify"}}>
                        <button className={"btn btn-write"}>수정</button>
                    </Link>
                    <Link to="/PasswordCheck" state={{boardSeq: boardSeq, state: "delete"}}>
                        <button className={"btn btn-delete"}>삭제</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BoardDetail;
