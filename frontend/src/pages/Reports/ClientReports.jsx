import { Box, Tabs} from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import ReportsDataList from '../../components/ReportsDataList';
import ReportTabs from '../../components/ReportTabs';

const ClientReports = () => {
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:3500/report')
            .then((responce) => {
                setReports(responce.data.data);
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
        // { field: 'address', headerName: "Address", flex: 1 },
    ]

    const rows = reports.map((cust, index) => ({
        id: cust._id,
        no: index + 1,
        name: cust.firstName + ' ' + cust.lastName,
        phone: cust.phone,
        email: cust.email,
        // address: cust.address.street
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

export default ClientReports