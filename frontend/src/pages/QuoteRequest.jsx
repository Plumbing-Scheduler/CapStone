import { Box, Typography, TextField } from "@mui/material";
import Header from "../components/Header";
import Spinner from "react-bootstrap/esm/Spinner";
import AddNewButton from "../components/AddNewButton";
import { useEffect, useState } from "react";
import axios from 'axios';

const Quotes = () => {
    // Declaring Constants
    const [loading, setLoading] = useState(false);
    const [ quotes, setQuotes ] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:3500/quote')
            .then((response) =>{
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
                <Box>
                    {/* Quote Request List will go here */}
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Service</th>
                                <th></th>
                                <th>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotes.map((quote, index) => (
                                <tr key={quote._id}>
                                    <td>{index + 1}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </Box>
            )}
        </Box>
    )
}

export default Quotes;