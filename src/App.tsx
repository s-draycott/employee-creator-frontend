import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeList from "./api/employeeApi";
import ContractList from "./api/contractApi";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EmployeeList />} />
                <Route
                    path="/contracts/:employeeId"
                    element={<ContractList />}
                />
            </Routes>
        </Router>
    );
}

export default App;
