import { Alert, AlertTitle, Box, TextField, Typography, Button, useTheme, Divider } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../axiosInstance.js";
import useMediaQuery from '@mui/material/useMediaQuery';
import { tokens } from "../../theme.js";

export const CreateCustomer = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [serverError, setServerError] = useState(false);
    const [noInput, setNoInput] = useState(false);
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
        axiosInstance
            .post('/customer', newCustomer)
            .then(() => {
                navigate('/customers');
            }
            )
            .catch((error) => {
                setServerError(false);
                setNoInput(false);
                if (error.response.status === 500) {
                    setServerError(true);
                }
                else if (error.response.status === 400) {
                    setNoInput(true);
                }
            });
    };

    const formatPhone = (event) => {
        let num = event.target.value;
        num = num.replace(/\D/, '');
        setPhone(num)
    };

    return (
        <Box>
            <Header title="CUSTOMER" subtitle="Add New Customer" />
            <div className={`shadow-lg mt-3 `}>
                <Divider variant="middle" sx={{ pt: '20px' }} />
                <Box m="10px auto" p={"0 0 30px 0"} width={"90%"} >
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
                            gridColumn: "span 4",
                            margin: "auto",
                            width: '80%',
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
                            sx={{ gridColumn: "span 1" }}
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
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            required
                            type="text"
                            variant='filled'
                            label="Phone"
                            name="phone #"
                            id="phone"
                            value={phone}
                            onChange={formatPhone}
                            sx={{ gridColumn: "span 1" }}
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
                            sx={minwidth2 ? { gridColumn: "span 1" } : { gridColumn: "span 2" }}
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
                            sx={minwidth2 ? { gridColumn: "span 1" } : { gridColumn: "span 2" }}
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
                            sx={minwidth2 ? { gridColumn: "span 1" } : { gridColumn: "span 2" }}
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
                            sx={minwidth2 ? { gridColumn: "span 1" } : { gridColumn: "span 2" }}
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
                    </Box>

                    <Box sx={{ width: "30%", margin: "10px auto" }}>
                        {serverError &&
                            <Alert severity="error" >
                                <AlertTitle>Server Error</AlertTitle>
                                Internal Server Error. Please Try Again Later.
                            </Alert>}

                        {noInput &&
                            <Alert severity="warning">
                                <AlertTitle>Warning</AlertTitle>
                                Please Fill All Required Fields
                            </Alert>}
                    </Box>
                    <Divider variant="middle" sx={{ pt: '10px', boxShadow: '5px' }} />
                    <div className="flex justify-end pt-3 pb-2">
                        <Button
                            onClick={handleSave}
                            sx={{
                                backgroundColor: colors.redAccent[500],
                                fontWeight: 'bold',
                                fontSize: '13px',
                                width: minwidth1 ? 'auto' : '80%',
                                borderRadius: '3px',
                                color: 'white',
                                margin: 'auto'
                            }}
                        >
                            Save and Add
                        </Button>
                    </div>
                </Box>
            </div>
        </Box>
    )
}
export default CreateCustomer