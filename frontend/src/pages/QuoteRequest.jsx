import { Box } from "@mui/material";
import Header from "../components/Header";
import Spinner from "react-bootstrap/esm/Spinner";
import AddNewButton from "../components/AddNewButton";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import DataList from '../components/DataList';

const Quotes = () => {
    // Declaring Constants
    const [loading, setLoading] = useState(true);
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        setLoading(true);
        axiosInstance
            .get('/quote')
            .then((response) => {
                setQuotes(response.data.data)
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error)
            })
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
        <Box >
            <Header title="QUOTE REQUESTS" subtitle="SELECT QUOTE" />
            <div className='flex justify-end' >
                <AddNewButton destination="create" item="Quote" />
            </div>

            {loading ? (
                <div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>
            ) : (
                <DataList columnData={columns} rowData={rows} />
            )}
        </Box>
    )
}

export default Quotes;