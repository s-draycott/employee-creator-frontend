import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DefaultDeserializer } from "v8";
const API_URL = "http://localhost:9000";

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    address: string;
}

const EmployeeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get(`${API_URL}/employees`)
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((err) => {
                setError("Failed to fetch employees");
            });
    }, []);
    return (
        <div>
            <h2> Employee List</h2>
            <ul>
                {" "}
                {employees.map((employee) => (
                    <li key={employee.id}>
                        {employee.firstName} - {employee.lastName} -{" "}
                        {employee.email} - {employee.address} -{" "}
                        {employee.mobileNumber}
                        {" | "}
                        <Link to={`/contracts/${employee.id}`}>Contracts</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
