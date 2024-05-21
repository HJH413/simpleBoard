import { useLocation } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import "../css/Layouts.css";

const Layout = (props) => {
    const location = useLocation();
    let headerText = '오류';

    if (location.pathname === '/') {
        headerText = '목록';
    }

    if (location.pathname === '/Write') {
        headerText = '등록';
    }

    if (location.pathname.match(/^\/Detail\//) !== null) {
        headerText = '상세';
    }

    if (location.pathname === '/Modify') {
        headerText = '수정';
    }

    if (location.pathname === '/PasswordCheck') {
        headerText = '비밀번호 확인';
    }

    return (
        <div className="layout">
            <Header text={headerText}/>
            <main className="content">
                {props.children}
            </main>
            <Footer/>
        </div>
    );
}

export default Layout;
