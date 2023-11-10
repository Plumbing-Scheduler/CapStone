import { Box } from "@mui/material";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import ReportTabs from '../components/ReportTabs';
import { Outlet } from "react-router-dom";

export const Reports = () => {
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:3500/reports')
            .then((responce) => {
                setReports(responce.data.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            })
    }, [])

    const columns = [
        { field: 'no', headerName: "No.", width: 70 },
        { field: 'name', headerName: "Name", flex: 1 },
        { field: 'phone', headerName: "Phone", flex: 1 },
        { field: 'email', headerName: "Email", flex: 1 },
        { field: 'type', headerName: "Employement Type", flex: 1 },
        { field: 'status', headerName: "Status", flex: 1 },
    ];

    const rows = ((emp, index) => ({
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
                <Header title="REPORTS" subtitle="Select Report" />
            </Box >
            <Box display="full">
                <ReportTabs />
                {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
                    <Outlet />
                )}
            </Box>
        </Box>
    )
}

export default Reports;