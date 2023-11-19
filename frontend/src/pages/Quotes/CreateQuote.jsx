import { Box, TextField, Typography, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { tokens } from "../../theme";
import useMediaQuery from '@mui/material/useMediaQuery';

const Quotes = () => {
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
    const minwidth1 = useMediaQuery('(min-width:800px)');
    const minwidth2 = useMediaQuery('(min-width:500px)');

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
        axios
            .post('http://localhost:3500/quote', newQuote)
            .then((response) => {
                console.log(response.data)
                navigate('/quotes')
            }
            ).catch((error) => {
                console.log(error);
            })
    }

    return (
        <Box >
            <Header title="QUOTE REQUESTS" subtitle="Add New Quote" />
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        m: "10px auto",
                        width: '80%',
                        textAlign: 'center'
                    }}>
                </Typography>
                <Box
                    display="grid"
                    gap="20px"
                    gridTemplateColumns={minwidth1 ? "repeat(2, minmax(0, 1fr))" : minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
                    sx={{
                        gridColumn: "span 2",
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
                        sx={{ gridColumn: "span 1" }}
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
                        sx={{ gridColumn: "span 1" }}
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
                        sx={{ gridColumn: "span 1" }}
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
                        sx={{ gridColumn: "span 1" }}
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
                        sx={{ gridColumn: "span 1" }}
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
                        sx={{ gridColumn: "span 1" }}
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
                    <TextField
                        fullWidth
                        type="number"
                        variant='filled'
                        label="Cost"
                        name="cost"
                        id="cost"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        sx={{ gridColumn: "2/3" }}
                    />
                </Box >
                <div className="flex justify-end mr-40 pt-4">
                    <Button
                        onClick={handleSave}
                        sx={{
                            backgroundColor: colors.redAccent[500],
                            fontWeight: 'bold',
                            fontSize: '13px',
                            width: minwidth1 ? 'auto' : minwidth2 ? '80%' : '100%',
                            borderRadius: '3px'
                        }}
                    >
                        Save and Add
                    </Button>
                </div>
            </Box>
        </Box>
    )
}

export default Quotes;