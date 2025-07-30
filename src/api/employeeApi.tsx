import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Contract } from "./contractApi";
import "./employee.css";

const API_URL = "http://localhost:9000";

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    address: string;
    contracts?: Contract[];
}

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        axios.get<Employee[]>(`${API_URL}/employees`).then((response) => {
            setEmployees(response.data);
        });
    }, []);

    const handleDelete = (id: number) => {
        axios.delete(`${API_URL}/employees/${id}`).then(() => {
            setEmployees(employees.filter((e) => e.id !== id));
        });
    };

    return (
        <div>
            <h2>Employee List</h2>

            {employees.map((employee) => (
                <div key={employee.id}>
                    <strong>
                        {employee.firstName} {employee.lastName}
                    </strong>
                    {employee.contracts && employee.contracts.length > 0 ? (
                        <div>
                            {employee.contracts.map((contract) => (
                                <p key={contract.id}>{contract.contractType}</p>
                            ))}
                        </div>
                    ) : (
                        <p>No Contracts</p>
                    )}
                    {employee.email}
                    <br />

                    <Link to={`/contracts/${employee.id}`}>
                        View All Contracts
                    </Link>
                    <br />
                    <button onClick={() => handleDelete(employee.id)}>
                        Delete
                    </button>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default EmployeeList;
