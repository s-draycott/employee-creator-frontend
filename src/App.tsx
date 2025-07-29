import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeList from "./api/employeeApi";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EmployeeList />} />
            </Routes>
        </Router>
    );
}

export default App;
