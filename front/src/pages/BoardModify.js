import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import ValidationInput from "../component/common/ValidationInput";

const BoardModify = () => {
    const location = useLocation();
    const [board, setBoard] = useState(null);
    const [boardFiles, setBoardFiles] = useState([]); // 원래 첨부파일
    const [boardNewFiles, setBoardNewFiles] = useState([null, null, null]); // 새로 저장한 첨부파일
    const [boardDeleteFiles, setBoardDeleteFiles] = useState([]); // 삭제한 첨부파일
    const [validationChecks, setValidationChecks] = useState({}); // 입렵값들 유효성검사결과저장
    const navigate = useNavigate();

    const validationChange = (id, check) => {
        console.log(validationChecks)
        setValidationChecks(prevChecks => ({
            ...prevChecks,
            [id]: check
        }));
    };

    const isFormValid = () => { // 유효성검사에 false 있는지 확인
        const requiredFields = [board.boardAuthor, board.boardPassword, board.boardTitle, board.boardContents];
        const allFieldsFilled = requiredFields.every(field => field !== "");
        return allFieldsFilled && Object.values(validationChecks).every(check => check === true);
    };

    const setFile = (index, event) => {
        const files = [...boardNewFiles];
        files[index] = event.target.files[0]

        setBoardNewFiles(files);
    }

    const deleteFile = (fileSeq, serverFileName, index) => {
        const newFiles = [...boardFiles];
        newFiles.splice(index, 1, { fileName: null });
        setBoardFiles(newFiles);

        const deleteFileList = [...boardDeleteFiles];
        deleteFileList.push({fileSeq, serverFileName});
        setBoardDeleteFiles(deleteFileList);
    };

    const modify = (event) => {
        event.preventDefault();

        if (!isFormValid()) {
            alert("저장 할 수 없습니다.\n입력된 값을 확인하세요.");
            return;
        }

        if (!window.confirm("수정 사항을 저장하시겠습니까?")) {
            return;
        }

        const formData = new FormData();

        formData.append('boardSeq', board.boardSeq);
        formData.append('boardAuthor', board.boardAuthor);
        formData.append('boardPassword', board.boardPassword);
        formData.append('boardTitle', board.boardTitle);
        formData.append('boardContent', board.boardContent);

        // deleteFiles를 JSON 문자열로 변환하여 추가
        formData.append('boardDeleteFilesJson', JSON.stringify(boardDeleteFiles));

        boardNewFiles.forEach((file) => {
            if (file) {
                formData.append(`boardFiles`, file);
            }
        });

        axios.post('/api/modify', formData, {
           headers: {
               'Content-Type': 'multipart/form-data'
           }
        }).then(response => {
            if (response.data === board.boardSeq) {
                alert("수정되었습니다.");
                navigate("/Detail/" + board.boardSeq);
            } else {
                alert("오류발생.");
                window.location.reload();
            }
        }).catch(error => {
           console.error(error);
        });
    }

    const inputChange = (field, value) => {
        setBoard(prevBoard => ({
            ...prevBoard,
            [field]: value
        }));
    };

    useEffect(() => {
        if (location.state) {
            setBoard(location.state);
            const initialFiles = location.state.boardFiles || [];
            const filledFiles = [...initialFiles];

            while (filledFiles.length < 3) {
                filledFiles.push({ fileName: null });
            }

            setBoardFiles(filledFiles);
        }
    }, [location]);

    if (!board) {
        return <div>Loading...</div>;
    }

    return (
        <div className={"container"}>
            <form>
                <div className={"form-container"}>
                    <div className="form-group2">
                        <label htmlFor="category">카테고리 : JAVA</label>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="category">등록일시 : {board.boardRegisTime}</label>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="category">수정일시
                            : {board.boardUpdateTime === null ? "-" : board.boardUpdateTime}</label>
                    </div>
                    <div className="form-group2">
                        <label htmlFor="category">조회수 : {board.boardViews}</label>
                    </div>
                    <div className="form-group2">
                        <ValidationInput
                            label={"작성자"}
                            id={"author"}
                            type={"text"}
                            value={board.boardAuthor || ""}
                            onChange={event => inputChange("boardAuthor", event)}
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
                            value={board.boardPassword}
                            onChange={event => inputChange("boardPassword", event)}
                            placeholder={"비밀번호"}
                            requiredValue={true}
                            valueType={"password"}
                            onValidationChange={validationChange}
                            messageOn={true}
                        />
                    </div>
                    <div className="form-group2">
                        <ValidationInput
                            label={"제목"}
                            id={"title"}
                            type={"text"}
                            value={board.boardTitle}
                            onChange={event => inputChange("boardTitle", event)}
                            requiredValue={true}
                            valueType={"title"}
                            onValidationChange={validationChange}
                            messageOn={true}
                        />
                    </div>
                    <div className="form-group2">
                        <label htmlFor="content">내용 *</label>
                        <textarea id="content"
                                  value={board.boardContent}
                                  onChange={(e) => setBoard({...board, boardContent: e.target.value})}
                                  maxLength={1999}
                        >
                        </textarea>
                    </div>
                    <div className="form-group2">
                        <label>파일 첨부</label>
                        {boardFiles.map((file, index) => (
                            <div className="file-upload" key={index}>
                                {file.fileName !== null ? (
                                    <>
                                        <span>{file.fileName}</span>
                                        <button type="button" onClick={() => deleteFile(`${file.fileSeq}`, `${file.serverFileName}`, index)}>파일 삭제</button>
                                    </>
                                ) : (
                                    <input type="file" onChange={(e) => setFile(index, e)} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={"footer-container"}>
                    <div className={"footer-btn-container"}>
                        <Link to="/">
                            <button className={"btn btn-cancel"}>취소</button>
                        </Link>
                        <button className={"btn btn-save"} onClick={(event) => modify(event)}>저장</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default BoardModify;
