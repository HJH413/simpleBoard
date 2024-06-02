import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ValidationInput from "../component/common/ValidationInput";

const BoardWrite = () => {
    const [boardCategoryList, setBoardCategoryList] = useState([]);
    const [boardCategory, setBoardCategory] = useState("");
    const [boardAuthor, setBoardAuthor] = useState("");
    const [boardPassword, setBoardPassword] = useState("");
    const [boardPasswordConfirm, setBoardPasswordConfirm] = useState("");
    const [boardTitle, setBoardTitle] = useState("");
    const [boardContents, setBoardContent] = useState("");
    const [boardFiles, setBoardFiles] = useState([null, null, null]);
    const [validationChecks, setValidationChecks] = useState({}); // 입렵값들 유효성검사결과저장
    const navigate = useNavigate();

    const validationChange = (id, check) => {
        setValidationChecks(prevChecks => ({
            ...prevChecks,
            [id]: check
        }));
    };

    const isFormValid = () => { // 유효성검사에 false 있는지 확인
        const requiredFields = [boardCategory, boardAuthor, boardPassword, boardTitle, boardContents];
        const allFieldsFilled = requiredFields.every(field => field !== "");
        return allFieldsFilled && Object.values(validationChecks).every(check => check === true);
    };

    const setFiles = (index, event) => {
        const files = [...boardFiles];
        files[index] = event.target.files[0]

        setBoardFiles(files);
    }

    const save = (event) => {
        event.preventDefault();

        if (!isFormValid()) {
            alert("저장 할 수 없습니다.\n입력된 값을 확인하세요.");
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
                        <ValidationInput
                            label={"작성자"}
                            id={"author"}
                            type={"text"}
                            value={boardAuthor}
                            onChange={setBoardAuthor}
                            requiredValue={true}
                            valueType={"author"}
                            onValidationChange={validationChange}
                            messageOn={true}
                        />
                    </div>
                    <div className="form-group2">
                        <ValidationInput
                            label={"비밀번호"}
                            id={"password"}
                            type={"password"}
                            value={boardPassword}
                            onChange={setBoardPassword}
                            placeholder={"비밀번호"}
                            requiredValue={true}
                            valueType={"password"}
                            onValidationChange={validationChange}
                            messageOn={true}
                        />
                        <ValidationInput
                            id={"boardPasswordConfirm"}
                            type={"password"}
                            value={boardPasswordConfirm}
                            onChange={setBoardPasswordConfirm}
                            placeholder={"비밀번호 확인"}
                            valueType={"password"}
                            onValidationChange={validationChange}
                        />
                        {boardPasswordConfirm.length > 4 && boardPassword !== boardPasswordConfirm ? "비밀번호가 일치하지 않습니다." : null}
                    </div>
                    <div className="form-group2">
                        <ValidationInput
                            label={"제목"}
                            id={"title"}
                            type={"text"}
                            value={boardTitle}
                            onChange={setBoardTitle}
                            requiredValue={true}
                            valueType={"title"}
                            onValidationChange={validationChange}
                            messageOn={true}
                        />
                    </div>
                    <div className="form-group2">
                        <label htmlFor="content">내용 *</label>
                        <textarea id="content" onChange={(e) => setBoardContent(e.target.value)}
                                  maxLength={1999}></textarea>
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
