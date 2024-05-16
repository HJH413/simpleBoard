import {Link} from "react-router-dom";
import React from "react";

const BoardDetail = () => {
    return (
        <div>
            <div>
                <div>작성자</div>
                <div>일자</div>
            </div>
            <div>
                <div>[카테고리] 제목</div>
                <div>조회수:500회</div>
            </div>
            <div>
                <div>
                    <textarea>
                        내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ  내용내ㅇㅇ
                    </textarea>
                </div>
                <div>
                    <p>파일1</p>
                    <p>파일1</p>
                </div>
            </div>
            <div>
                <div>댓글 목록</div>
                <div>
                    <textarea>댓글작성란</textarea>
                    <button>등록</button>
                </div>
            </div>
            <div>
                <Link to="/">
                    <button>목록</button>
                </Link>
                <Link to="/Modify">
                    <button>수정</button>
                </Link>
                <button>삭제</button>
            </div>
        </div>
    );
}

export default BoardDetail;