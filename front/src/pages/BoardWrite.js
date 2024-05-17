import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
const BoardWrite = () => {
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const save = (event) => {
        event.preventDefault();

        // 폼 데이터 유효성 검사
        if (password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 서버에 전송할 데이터
        const postData = {
            category,
            author,
            password,
            title,
            content
        };
    }

    useEffect(() => {
        axios.get('/api/test')
            .then((res) => {
                console.log(res);
            }).catch((reason) => {
            console.log(reason)
        })
    }, []);

    return (
        <div className={"container"}>
            <form>
                <div className={"form-container"}>
                    <div className="form-group2">
                        <label htmlFor="category">카테고리 *</label>
                        <select id="category" onChange={(e) => setCategory(e.target.value)}>
                            <option value={""}>카테고리 선택</option>
                            <option value={"Java"}>Java</option>
                            <option value={"JavaScript"}>JavaScript</option>
                            <option value={"Python"}>Python</option>
                        </select>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="author">작성자 <span className={"errorSpan"}>*</span></label>
                        {/* eslint-disable-next-line no-unused-expressions */}
                        <input type="text" id="author" onChange={(e) => {setAuthor(e.target.value);}} maxLength={4}/>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="password">비밀번호 *</label>
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} maxLength={15}/>
                        <label htmlFor="password-confirm">비밀번호 확인 *</label>
                        <input type="password" id="password-confirm" onChange={(e) => setPasswordConfirm(e.target.value)} maxLength={15}/>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="title">제목 *</label>
                        <input type="text" id="title" onChange={(e) => setTitle(e.target.value)} maxLength={99}/>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="content">내용 *</label>
                        <textarea id="content" onChange={(e) => setContent(e.target.value)} maxLength={1999}></textarea>
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
                        <button className={"btn btn-save"} onClick={save}>저장</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default BoardWrite;