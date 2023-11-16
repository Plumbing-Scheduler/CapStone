import { Box } from "@mui/material";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
// import { Outlet } from "react-router-dom";
import ReportFilter from "../components/ReportFilter";


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

    return (
        <Box>
            <Box>
                <Header title="REPORTS" subtitle="Filter Reports" />
            </Box >
            <Box display="full">
                {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
                    <ReportFilter />
                )}
            </Box>
        </Box>
    )
}

export default Reports;