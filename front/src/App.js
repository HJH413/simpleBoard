import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Layout from "./Layouts/Layout";
import BoardList from "./pages/BoardList";
import BoardWrite from "./pages/BoardWrite";
import BoardDetail from "./pages/BoardDetail";
import BoardModify from "./pages/BoardModify";


function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<BoardList />} />
                    <Route path="/Write" element={<BoardWrite />} />
                    <Route path="/Detail" element={<BoardDetail />} />
                    <Route path="/Modify" element={<BoardModify />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;