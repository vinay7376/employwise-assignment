import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import UsersPage from "./pages/Users";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/users" element={<UsersPage />} />
            </Routes>
        </Router>
    );
};

export default App;
