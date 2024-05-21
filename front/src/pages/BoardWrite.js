import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const BoardWrite = () => {
    const [boardCategoryList, setBoardCategoryList] = useState([]);
    const [boardCategory, setBoardCategory] = useState("");
    const [boardAuthor, setBoardAuthor] = useState("");
    const [boardPassword, setBoardPassword] = useState("");
    const [boardPasswordConfirm, setBoardPasswordConfirm] = useState("");
    const [boardTitle, setBoardTitle] = useState("");
    const [boardContents, setBoardContent] = useState("");
    const [boardFiles, setBoardFiles] = useState([null, null, null]);
    const navigate = useNavigate();

    const setFiles = (index, event) => {
        const files = [...boardFiles];
        files[index] = event.target.files[0]

        setBoardFiles(files);
    }

    const save = (event) => {
        event.preventDefault();

        // 폼 데이터 유효성 검사
        if (boardPassword !== boardPasswordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 서버에 전송할 데이터
        const formData = new FormData();
        formData.append('boardCategory', boardCategory);
        formData.append('boardAuthor', boardAuthor);
        formData.append('boardPassword', boardPassword);
        formData.append('boardTitle', boardTitle);
        formData.append('boardContents', boardContents);
        boardFiles.forEach((file) => {
           if (file) {
               formData.append(`boardFiles`, file);
           }
        });

        axios.post('/api/board', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            if (response.data > 0) {
                alert("저장이 완료되었습니다.")
                navigate("/");
            }
        }).catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        axios.get("/api/category")
            .then(response => {
                setBoardCategoryList(response.data);
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    return (
        <div className={"container"}>
            <form>
                <div className={"form-container"}>
                    <div className="form-group2">
                        <label htmlFor="category">카테고리 *</label>
                        <select id="category" onChange={(e) => setBoardCategory(e.target.value)}>
                            <option value={""}>카테고리 선택</option>
                            {boardCategoryList.map((value, index) => (
                                <option key={index} value={value.boardCategory}>{value.boardCategory}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="author">작성자 <span className={"errorSpan"}>*</span></label>
                        <input type="text" id="author" onChange={(e) => {setBoardAuthor(e.target.value);}} maxLength={4}/>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="password">비밀번호 *</label>
                        <input type="password" id="password" onChange={(e) => setBoardPassword(e.target.value)}
                               maxLength={15}/>
                        <label htmlFor="password-confirm">비밀번호 확인 *</label>
                        <input type="password" id="password-confirm"
                               onChange={(e) => setBoardPasswordConfirm(e.target.value)} maxLength={15}/>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="title">제목 *</label>
                        <input type="text" id="title" onChange={(e) => setBoardTitle(e.target.value)} maxLength={99}/>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="content">내용 *</label>
                        <textarea id="content" onChange={(e) => setBoardContent(e.target.value)} maxLength={1999}></textarea>
                    </div>
                    <div className="form-group2">
                        <label>파일 첨부</label>
                        <div className="file-upload">
                            <input type="file" onChange={(e) => setFiles(0, e)}/>
                        </div>
                        <div className="file-upload">
                            <input type="file" onChange={(e) => setFiles(1, e)}/>
                        </div>
                        <div className="file-upload">
                            <input type="file" onChange={(e) => setFiles(2, e)}/>
                        </div>
                    </div>
                </div>
                <div className={"footer-container"}>
                    <div className={"footer-btn-container"}>
                        <Link to="/">
                            <button className={"btn btn-cancel"}>취소</button>
                        </Link>
                        <button className={"btn btn-save"} onClick={save}>저장</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default BoardWrite;
