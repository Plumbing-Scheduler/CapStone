import { Alert, AlertTitle, Box, TextField, Typography, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { tokens } from "../../theme.js";

const Quotes = () => {
    const [ serverError, setServerError ] = useState(false);
    const [ noInput, setNoInput ] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [cost, setCost] = useState('');
    const [busName, setBusName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const newQuote = {
        firstName,
        lastName,
        phone,
        description,
        address,
        cost,
        busName,
        email,
    }

    const handleSave = () => {
        axiosInstance
            .post('/quote', newQuote)
            .then(() => {
                navigate('/quotes')
            }
            )
            .catch((error) => {
                setServerError(false);
                setNoInput(false);
                console.log(error.response.status)
                if (error.response.status === 500) {
                    setServerError(true);
                }
                else if (error.response.status === 400) {
                    setNoInput(true);
                }
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
                    type="text"
                    variant='filled'
                    label="First Name"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    type="text"
                    variant='filled'
                    label="Last Name"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    type="text"
                    variant='filled'
                    label="Phone #"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    type="text"
                    variant='filled'
                    label="Email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ gridColumn: "span 2" }}
                />

                <TextField
                    fullWidth
                    type="text"
                    variant="filled"
                    label="Buisness Name"
                    name="businessname"
                    id="businessname"
                    value={busName}
                    onChange={(e) => setBusName(e.target.value)}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    type="text"
                    variant="filled"
                    label="Address"
                    name="address"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    type="number"
                    variant='filled'
                    label="Cost"
                    name="cost"
                    id="cost"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
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
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ gridColumn: "span 2" }}
                />    
            </Box>
            <Box sx={{width: "30%", margin: "10px auto"}}>
                    {serverError &&
                    <Alert severity="error" >
                        <AlertTitle>Server Error</AlertTitle>
                            Internal Server Error. Please Try Again Later.
                    </Alert>}

                    {noInput &&
                    <Alert severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                            Please Fill Out All Fields
                    </Alert>}
                </Box>
            <Box
                    backgroundColor={colors.buttonBase}
                    display="grid"
                    sx={{
                        margin: "10px auto",
                        width: '150px',
                        borderRadius: "5px"
                    }}
                >
                    <Button variant="Text" onClick={handleSave} backgroundcolor={colors.buttonBase}>
                        Save and Add
                    </Button>
                </Box>
        </Box>
    )
}

export default Quotes;