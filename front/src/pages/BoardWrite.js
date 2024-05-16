import {Link} from "react-router-dom";
import React from "react";

const BoardWrite = () => {
    return (
        <div>
            <div>
                <div>카테고리</div>
            </div>
            <div>
                <div>작성자</div>
            </div>
            <div>
                <div>비번1</div>
                <div>비번2</div>
            </div>
            <div>
                <div>제목</div>
            </div>
            <div>
                    <textarea>
                        내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ
                    </textarea>
            </div>
            <div>
                <p>파일1</p>
                <p>파일2</p>
                <p>파일3</p>
            </div>
            <div>
                <Link to="/">
                    <button>취소</button>
                </Link>
                <button>저장</button>
            </div>
        </div>
    );
}

export default BoardWrite;