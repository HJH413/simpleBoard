import { useLocation } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import "../css/Layouts.css";

const Layout = (props) => {
    const location = useLocation();
    let headerText = '';

    switch (location.pathname) {
        case '/':
            headerText = '목록';
            break;
        case '/Write':
            headerText = '등록';
            break;
        case '/Detail':
            headerText = '보기';
            break;
        case '/Modify':
            headerText = '수정';
            break;
        default:
            headerText = '오류';
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