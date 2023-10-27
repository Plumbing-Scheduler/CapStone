import { Box, TextField, Typography, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import useMediaQuery from '@mui/material/useMediaQuery';
import { tokens } from "../../theme.js";

export const CreateCustomer = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const minwidth1 = useMediaQuery('(min-width:800px)');
    const minwidth2 = useMediaQuery('(min-width:500px)');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [busName, setBusName] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');

    const navigate = useNavigate();

    
    
    const newCustomer = {
        firstName,
        lastName,
        phone,
        email,
        busName,
        address: {
            street,
            postalCode,
            city,
            province
        }
        
        
    }
    const handleSave = () => {
        axios
            .post('http://localhost:3500/customer', newCustomer)
            .then(
                navigate('/customers')
            )
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Box ml={'20px'}>
            <Header title="CUSTOMER" subtitle="NEW CUSTOMER" />
            <Box m="10px auto" p={"0 0 30px 0"} width={"90%"} >

                <Typography
                    //display="flex"
                    variant="h4"
                    //justifyContent="space-between"
                    sx={{
                        m: "30px auto 5px auto",
                        width: '75%',
                    }}>
                    Customer Information
                </Typography>

                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns={minwidth1 ? "repeat(4, minmax(0, 1fr))" : minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
                    sx={{
                        gridColumn: "span 4",
                        margin: "auto",
                        width: '75%',
                    }}
                >
                    <TextField
                        fullWidth
                        required
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
                        required
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
                        required
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
                        required
                        type="number"
                        variant='filled'
                        label="Phone"
                        name="phone #"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        type="text"
                        variant='filled'
                        label="Buisness Name"
                        name="busName"
                        id="busName"
                        value={busName}
                        onChange={(e) => setBusName(e.target.value)}
                        sx={{ gridColumn: "span 2" }}
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
                        sx={{ gridColumn: "span 2" }}
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
                        sx={{ gridColumn: "span 2" }}
                    />
                  </Box>
                  <Box
                    backgroundColor={colors.buttonBase}
                    display="grid"
                    sx={{
                        margin: "30px auto",
                        width: '150px',
                        borderRadius: "5px"
                    }}
                >
                    <Button variant="Text" onClick={handleSave} backgroundcolor={colors.buttonBase}>
                        Save and Add
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
export default CreateCustomer