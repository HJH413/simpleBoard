import React from "react";

const Header = ({ text }) => {
    return (
        <header className="header">
            <h1>게시판 - {text}</h1>
        </header>
    );
}

export default Header;
