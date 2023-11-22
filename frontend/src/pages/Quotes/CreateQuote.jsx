import { Alert, AlertTitle, Box, TextField, Typography, Button, useTheme, Divider } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { tokens } from "../../theme";
import useMediaQuery from '@mui/material/useMediaQuery';

const Quotes = () => {
    const [serverError, setServerError] = useState(false);
    const [noInput, setNoInput] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
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
        address: {
            street,
            postalCode,
            city,
            province
        },
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
        <Box >
            <Header title="QUOTE REQUESTS" subtitle="Add New Quote" />
            <Box>
                <div className={`shadow-lg mt-3 `}>
                    <Divider variant="middle" sx={{ pt: '20px' }} />
                    <Typography
                        variant="h3"
                        sx={{
                            m: "30px auto 5px auto",
                            width: '83%',
                            pb: '10px',
                        }}>
                        <b>Customer Information</b>
                    </Typography>
                    <Box
                        display="grid"
                        gap="20px"
                        gridTemplateColumns={minwidth1 ? "repeat(2, minmax(0, 1fr))" : minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
                        sx={{
                            gridColumn: "span 2",
                            margin: "auto",
                            width: '80%'
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
                            required
                            type="text"
                            variant='filled'
                            label="Address"
                            name="address"
                            id="address"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            required
                            type="text"
                            variant='filled'
                            label="Postal Code"
                            name="postalCode"
                            id="postalCode"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            required
                            type="text"
                            variant='filled'
                            label="City"
                            name="city"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            required
                            type="text"
                            variant='filled'
                            label="Province"
                            name="province"
                            id="province"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            sx={{ gridColumn: "2/3" }}
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
                    </Box >
                    <Typography
                        variant="h3"
                        sx={{
                            m: "30px auto 5px auto",
                            width: '83%',
                            pb: '10px',
                        }}>
                        <b>Service Information</b>
                    </Typography>
                    <Box
                        display="grid"
                        gap="20px"
                        gridTemplateColumns={minwidth1 ? "repeat(2, minmax(0, 1fr))" : minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
                        sx={{
                            gridColumn: "span 2",
                            margin: "auto",
                            width: '80%'
                        }} >
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
                    <Box sx={{ width: "30%", margin: "10px auto" }}>
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
                    <Divider variant="middle" sx={{ pt: '10px', boxShadow: '5px' }} />
                    <div className="flex justify-end mr-32 pt-3 pb-5">
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
                </div>
            </Box>
        </Box >
    )
}

export default Quotes;