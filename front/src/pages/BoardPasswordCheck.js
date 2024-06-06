import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {decrypt} from "../component/common/Encryption";

const BoardPasswordCheck = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setState] = useState("");
    const [boardSeq, setBoardSeq] = useState("");
    const [boardPassword, setBoardPassword] = useState("");
    const [board, setBoard] = useState("");

    useEffect(() => {
        if (location.state !== null) {
            setBoardSeq(location.state.boardSeq);
            setState(location.state.state);
            if (location.state.board !== null) {
                setBoard(location.state.board);
            }
        } else {
            alert("잘못된 접근입니다.");
            navigate(-1); // 뒤로 가기
        }
    }, [location.state, navigate]);

    const passwordCheck = async () => {
        try {
            const response = await axios.post("/api/password", {
                boardSeq: boardSeq
            });

            return decrypt(response.data.password) === boardPassword;
        } catch (error) {
            console.error(error)
        }
    };

    const modifyPage = async () => {
        navigate("/Modify", { state: { ...board, boardPassword: boardPassword } });
    };

    // todo: 백엔드에서 삭제할때 암호화 복호화하는 로직추가하기
    const deleteBoard = () => {
        axios.delete("/api/board",
            {data: {
                boardSeq: boardSeq,
                boardPassword: boardPassword
            }})
            .then(response => {
                if (response.data) {
                    alert("삭제 성공");
                    navigate("/");
                } else {
                    alert("삭제 실패");
                    navigate(-1); // 뒤로 가기
                }
            })
            .catch(error => console.error(error));
    };

    const handleCheck = async () => {
        const check = await passwordCheck();  // passwordCheck 함수가 완료될 때까지 기다림

        if (check) {
            if (state === 'modify') {
                modifyPage();
            } else if (state === 'delete') {
                deleteBoard();
            }
        } else {
            alert("비밀번호가 틀렸습니다.");
        }
    };


    return (
        <div className={"container"}>
            <div className={"password-check-container"}>
                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" onChange={e => setBoardPassword(e.target.value)} maxLength={15}
                           placeholder={"비밀번호를 입력해 주세요."}/>
                </div>
                <div className={"footer-btn-container"}>
                    <button className={"btn btn-cancel"} onClick={() =>  navigate(-1)}>취소</button>
                    <button className={"btn btn-save"} onClick={handleCheck}>확인</button>
                </div>
            </div>
        </div>
    );
}

export default BoardPasswordCheck;
