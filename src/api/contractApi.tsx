import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:9000";

export interface Contract {
    id?: number;
    employeeId: number;
    startDate: String;
    contractType: "permanent" | "contract";
    fullTime: boolean;
    endDate?: String | null;
    hoursPerWeek: number;
}

const ContractList: React.FC = () => {
    const { employeeId } = useParams<{ employeeId: string }>();
    const { employeeFirstName } = useParams<{ employeeFirstName: string }>();
    const [contracts, setContracts] = useState<Contract[]>([]);

    useEffect(() => {
        axios
            .get(`${API_URL}/employees/${employeeId}/contracts`)
            .then((response) => {
                setContracts(response.data);
            });
    }, [employeeId]);

    return (
        <div>
            <h2>Contracts for {employeeFirstName}</h2>
            <Link to={`/`}>Back</Link>
            <ul>
                {contracts.length > 0 ? (
                    contracts.map((contract) => (
                        <li key={contract.id}>
                            {contract.contractType} | Start:{" "}
                            {contract.startDate} | End:{" "}
                            {contract.endDate ?? "Ongoing"} |{" "}
                            {contract.fullTime ? "Full-time" : "Part-time"} |{" "}
                            {contract.hoursPerWeek} hrs/week
                        </li>
                    ))
                ) : (
                    <p>No contracts found for this employee.</p>
                )}
            </ul>
        </div>
    );
};

export default ContractList;
