import { Box, Typography, TextField, Paper } from "@mui/material";
import {Link} from 'react-router-dom';
import Header from "../components/Header";
import Spinner from "react-bootstrap/esm/Spinner";
import AddNewButton from "../components/AddNewButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from "react";
import axios from 'axios';

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

    return (
        <Box >
            <Header title="QUOTE REQUESTS" subtitle="Select Quote" />
            <div>
                <AddNewButton destination="create" item="Quote" />
            </div>

            {loading ? (

                <div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>
            ) : (
                <Paper sx={{ width: '70%', margin: 'auto', border: "2px solid gray", borderRadius: '5px', bgcolor: "#141414", color: "#d0d1d5", }}>
                    {/* Quote Request List will go here */}
                    <table className='w-full text-xl'>
                        <thead className='border-b-4 border-slate-600 text-left pl-2'>
                            <tr>
                                <th className="pl-2">No.</th>
                                <th className="pl-2">Name</th>

                                <th className="pl-2">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotes.map((quote, index) => (
                                <tr key={quote._id} className='h-20 border-b border-slate-700'>
                                    <td className="pl-2">{index + 1}</td>
                                    <td className="pl-2">{quote.firstName + " " + quote.lastName}</td>
                                    <td className='flex justify-evenly items-center  h-20'>
                                        <Link to={`edit/${quote._id}`} className='link '>
                                            <EditIcon />
                                        </Link>
                                        <Link to={`details/${quote._id}`} className='link'>
                                            <InfoOutlinedIcon />
                                        </Link>
                                        <Link to={`delete/${quote._id}`} className='link'>
                                            <DeleteOutlineIcon />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </Paper>
            )}
        </Box>
    )
}

export default Quotes;