import { Box, Tabs} from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import ReportsDataList from '../../components/ReportsDataList';


const QuoteHistoryReports = () => {
    const [loading, setLoading] = useState(true);
    const [quotes, setWorkOrders] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:3500/workorders')
            .then((responce) => {
                setWorkOrders(responce.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const columns = [ 
        {field: 'no', headerName: "No.", width: 70},
        {field: 'name', headerName: "Name", flex: 1},
        {field: 'phone', headerName: "Phone", flex: 1},
        {field: 'email', headerName: "Email", flex: 1},
        {field: 'cost', headerName: "Est. Cost", flex: 1},
    ]
    
    const rows = quotes.map((qu, index) => ({
        id: qu._id,
        no: index + 1,
        name: qu.firstName + ' ' + qu.lastName,
        phone: qu.phone,
        email: qu.email,
        cost: "$"+qu.cost
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

export default QuoteHistoryReports