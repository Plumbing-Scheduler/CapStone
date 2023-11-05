import { Box, Tabs } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import ReportsDataList from '../../components/ReportsDataList';

export const EmployeeReports = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:3500/employees')
            .then((responce) => {
                setEmployees(responce.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const columns = [
        { field: 'no', headerName: "No.", width: 70 },
        { field: 'name', headerName: "Name", flex: 1 },
        { field: 'phone', headerName: "Phone", flex: 1 },
        { field: 'email', headerName: "Email", flex: 1 },
        { field: 'type', headerName: "Employement Type", flex: 1 },
        { field: 'status', headerName: "Status", flex: 1 },
    ];

    const rows = employees.map((emp, index) => ({
        id: emp._id,
        no: index + 1,
        name: emp.firstName + " " + emp.lastName,
        phone: emp.phone,
        email: emp.email,
        type: emp.employmentType + " " + emp.role,
        status: emp.status
    }))

    return (

        <Box>
            <Box>
                {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
                    <ReportsDataList columnData={columns} rowData={rows} />
                )}
            </Box>
        </Box>

    )
}

export default EmployeeReports