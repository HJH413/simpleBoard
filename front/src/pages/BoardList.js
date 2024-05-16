import React from 'react';
import { Link } from 'react-router-dom';

const BoardList = () => {
    return (
        <div>
            <div>
                <input type={"date"}/>
                <input type={"date"}/>
                <select>
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                </select>
                <input type={"text"}/>
                <button>검색</button>
            </div>
            <div>
                <div>
                    총 500건
                </div>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <td>헤더1</td>
                            <td>헤더2</td>
                            <td>헤더3</td>
                            <td>헤더4</td>
                            <td>헤더5</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>값1</td>
                            <td>값2</td>
                            <td>값3</td>
                            <td>값4</td>
                            <td>값5</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                페이징번호
            </div>
            <div>
                <Link to="/Write">
                    <button>작성</button>
                </Link>
            </div>
        </div>
    );
}

export default BoardList;