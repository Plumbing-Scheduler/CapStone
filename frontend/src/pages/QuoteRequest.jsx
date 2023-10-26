import { Box, Typography, TextField, Paper } from "@mui/material";
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Spinner from "react-bootstrap/esm/Spinner";
import AddNewButton from "../components/AddNewButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from "react";
import axios from 'axios';
import DataList from '../components/DataList';

const Quotes = () => {
    // Declaring Constants
    const [loading, setLoading] = useState(true);
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:3500/quote')
            .then((response) => {
                setQuotes(response.data.data)
                setLoading(false);
                console.log(response.data.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    const columns = [ 
        {field: 'no', headerName: "No.", width: 70},
        {field: 'name', headerName: "Name", flex: 1},
        {field: 'phone', headerName: "Phone", flex: 1},
        {field: 'email', headerName: "Email", flex: 1},
        {field: 'cost', headerName: "Est. Cost", flex: 1},
        {
            field: "Operations", headerName: "Operations", width: 200,  renderCell: ({ row: id }) => {
                return (
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <Link to={`edit/${id.id}`} className='link mr-auto'>
                            <EditIcon />
                        </Link>
                        <Link to={`details/${id.id}`} className='link m-auto'>
                            <InfoOutlinedIcon />
                        </Link>
                        <Link to={`delete/${id.id}`} className='link m-auto'>
                            <DeleteOutlineIcon />
                        </Link>
                    </Box>
                )
            }
        },
    ]

    const rows = quotes.map((qu, index) => ({
        id: qu._id,
        name: qu.firstName + ' ' + qu.lastName,
        phone: qu.phone,
        email: qu.email,
        cost: "$"+qu.cost
    }))

    return (
        <Box >
            <Header title="QUOTE REQUESTS" subtitle="Select Quote" />
            <div>
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