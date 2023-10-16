import { Box, TextField, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const Quotes = () => {
    const [ phone, setPhone ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ cost, setCost ] = useState("");
    const [ busName, setBusName ] = useState("");
    const [ email, setEmail ] = useState("");
    const navigate = useNavigate();

    const newQuote = {
        phone,
        description,
        address,
        cost,
        busName,
        email,
    }

    const handleSave = () => {
        axios
            .post('http:/localhost:3500/quote', newQuote)
            .then((response) => {
                console.log(response.data)
                navigate('/workorder')
            }
            ).catch((error) => {
                console.log(error);
            })
    }


    return (
        <Box m="20px">
            <Header title="QUOTE REQUESTS" subtitle="Select Quote" />

            <Typography
                //display="flex"
                variant="h4"
                //justifyContent="space-between"
                sx={{
                    m: "10px auto",
                    width: '80%',
                    textAlign: 'center'
                }}>
                Add New Quote
            </Typography>
            <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                    gridColumn: "span 4",
                    margin: "auto",
                    width: '75%'
                }} >
                <TextField
                    fullWidth
                    type="number"
                    variant='filled'
                    label="Phone #"
                    name="phone"
                    id=""
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    type="text"
                    variant='filled'
                    label="Email"
                    name="email"
                    id=""
                    sx={{ gridColumn: "span 2" }}
                />

                <TextField
                    fullWidth
                    type="text"
                    variant="filled"
                    label="Buisness Name"
                    name="businessname"
                    id=""
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    type="text"
                    variant="filled"
                    label="Address"
                    name="address"
                    id=""
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    type="number"
                    variant='filled'
                    label="Cost"
                    name="cost"
                    id=""
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    multiline
                    variant="filled"
                    label="Description"
                    required
                    cols="30"
                    rows="4"
                    name="description"
                    id=""
                    sx={{ gridColumn: "span 2" }}
                />
                 <button onClick={handleSave} className='bg-gray-500 w-1/2 h-12 '>
                    Save and Add
                </button>
            </Box>
           
        </Box>
    )
}

export default Quotes;