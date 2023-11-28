import React, { useState, useEffect } from 'react'
import { Alert, AlertTitle, Box, Typography, TextField, useTheme, Button, Divider, MenuItem } from "@mui/material";
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import Spinner from 'react-bootstrap/esm/Spinner';
import Header from '../../components/Header';
import { tokens } from "../../theme.js";
import useMediaQuery from '@mui/material/useMediaQuery';
import { titles } from '../../data/types'

const EditQuote = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [serverError, setServerError] = useState(false);
    const [noInput, setNoInput] = useState(false);
    const [type, setType] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [CuStreet, setCuStreet] = useState('');
    const [CuPostalCode, setCuPostalCode] = useState('');
    const [CuCity, setCuCity] = useState('');
    const [CuProvince, setCuProvince] = useState('');
    const [cost, setCost] = useState('');
    const [busName, setBusName] = useState('');
    const [email, setEmail] = useState('');
    const [customerId, setCustomerId] = useState('');
    const navigate = useNavigate();
    const minwidth1 = useMediaQuery('(min-width:800px)');
    const minwidth2 = useMediaQuery('(min-width:500px)');

    const data = {
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
        type,
        customerId
    }

    useEffect(() => {
        setLoading(true);
        axiosInstance
            .get(`/quote/${id}`)
            .then((response) => {
                setDescription(response.data.description);
                setPostalCode(response.data.address.postalCode)
                setStreet(response.data.address.street)
                setCity(response.data.address.city)
                setProvince(response.data.address.province)
                setCost(response.data.cost);
                setType(response.data.type)
                setCustomerId(response.data.customerId)
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            })

    }, [])

    useEffect(() => {
        axiosInstance
            .get(`/customer/${customerId}`)
            .then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setPhone(response.data.phone);
                setBusName(response.data.busName);
                setEmail(response.data.email);
                setCuCity(response.data.address.city)
                setCuPostalCode(response.data.address.postalCode)
                setCuProvince(response.data.address.province)
                setCuStreet(response.data.address.street)
            }).catch((error) => {
                console.log(error);
            })
        setLoading(false);
    }, [customerId])

    const handleSave = () => {
        axiosInstance
            .put(`/quote/${id}`, data)
            .then(() => {
                const cust = {
                    firstName,
                    lastName,
                    phone,
                    busName,
                    email,
                    address: {
                        street: CuStreet,
                        postalCode: CuPostalCode,
                        city: CuCity,
                        province: CuProvince
                    },
                }
                axiosInstance
                    .put(`/customer/${customerId}`, cust)
                    .then(() => {
                        navigate('/quotes')
                    })
            })
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
        <Box>
            <Header title={"QUOTE REQUESTS"} subtitle={"Edit Quote Details"} />
            {loading ? (
                <div className='w-5 m-auto h-5 pt-11 text-center'>
                    <Spinner />
                </div>
            ) : (
                <div className={`shadow-lg mt-3 `}>
                    <Divider variant="middle" sx={{ pt: '20px' }} />
                    <Box>
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
                                width: '80%',
                            }}>
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
                                label="Cost $"
                                name="Cost"
                                id="Cost"
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                                sx={{ gridColumn: "span 1" }}
                            />
                            <TextField
                                select
                                fullWidth
                                type="text"
                                variant="filled"
                                label="Service Type (optional)"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                name="serviceType"
                                id="serviceType"
                                sx={{ gridColumn: "span 1" }}
                            >
                                {titles.map((ttl) => (
                                    <MenuItem key={ttl.value} value={ttl.value}>
                                        {ttl.label}
                                    </MenuItem>
                                ))}
                            </TextField>
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
                        </Box>
                        <Typography
                            variant="h3"
                            sx={{
                                m: "30px auto 5px auto",
                                width: '83%',
                                pb: '10px',
                            }}>
                            <b>Customer Information </b>
                        </Typography>
                        <Box
                            display="grid"
                            gap="20px"
                            gridTemplateColumns={minwidth1 ? "repeat(2, minmax(0, 1fr))" : minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
                            sx={{
                                gridColumn: "span 4",
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
                                type="number"
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
                            /><TextField
                                fullWidth
                                required
                                type="text"
                                variant='filled'
                                label="Address"
                                name="address"
                                id="address"
                                value={CuStreet}
                                onChange={(e) => setCuStreet(e.target.value)}
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
                                value={CuPostalCode}
                                onChange={(e) => setCuPostalCode(e.target.value)}
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
                                value={CuCity}
                                onChange={(e) => setCuCity(e.target.value)}
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
                                value={CuProvince}
                                onChange={(e) => setCuProvince(e.target.value)}
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
                        <div className="flex justify-end pt-3 pb-5">
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
                                Save
                            </Button>
                        </div>
                    </Box>
                </div>)}
        </Box>
    )
}

export default EditQuote