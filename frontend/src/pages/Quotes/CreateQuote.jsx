import {
    Alert, AlertTitle, Box, TextField, Typography,
    Button, useTheme, Divider, MenuItem, Radio,
    RadioGroup, FormControl, FormControlLabel, FormLabel, FormGroup,
    Checkbox
} from "@mui/material";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { tokens } from "../../theme";
import useMediaQuery from '@mui/material/useMediaQuery';
import { titles } from '../../data/types'
const Quotes = () => {
    const [serverError, setServerError] = useState(false);
    const [noInput, setNoInput] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [type, setType] = useState('')
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
    const [qustreet, setQuStreet] = useState('');
    const [qupostalCode, setQuPostalCode] = useState('');
    const [qucity, setQuCity] = useState('');
    const [quprovince, setQuProvince] = useState('');

    const navigate = useNavigate();
    const minwidth1 = useMediaQuery('(min-width:800px)');
    const minwidth2 = useMediaQuery('(min-width:500px)');
    const [custType, setCustType] = useState("new");
    const [customers, setCustomers] = useState([{}]);
    const [customer, setCustomer] = useState('');
    const [checked, setChecked] = useState(false);
    let selectedCustomer = {}

    let newQuote = {
        firstName,
        lastName,
        phone,
        description,
        address: {
            street: qustreet,
            postalCode: qupostalCode,
            city: qucity,
            province: quprovince
        },
        cost,
        busName,
        email,
        type
    }

    const newCustomer = {
        firstName,
        lastName,
        phone,
        address: {
            street,
            postalCode,
            city,
            province
        },
        busName,
        email,
    }
    useEffect(() => {
        axiosInstance
            .get('/customer')
            .then((response) => {
                setCustomers(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    })

    const handleSave = async () => {
        if (custType === "returning") {
            console.log(selectedCustomer);
            axiosInstance
                .get(`/customer/${customer}`)
                .then((response) => {
                    newQuote = {
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        phone: response.data.phone,
                        description,
                        address: {
                            street: qustreet,
                            postalCode: qupostalCode,
                            city: qucity,
                            province: quprovince
                        },
                        cost,
                        busName: response.data.busName,
                        email: response.data.email,
                        type
                    }
                }).then(() => {
                    axiosInstance
                        .post('/quote', newQuote)
                        .then(() => {
                            navigate('/quotes')
                        })
                })
                .catch((error) => {
                    setServerError(false);
                    setNoInput(false);

                    if (error.response.status === 500) {
                        setServerError(true);
                    }
                    else if (error.response.status === 400) {
                        setNoInput(true);
                    }
                })

        }
        else {
            axiosInstance
                .post('/customer', newCustomer)
                .then(() => {
                    axiosInstance
                        .post('/quote', newQuote)
                        .then(() => {
                            navigate('/quotes')
                        })
                })
                .catch((error) => {
                    setServerError(false);
                    setNoInput(false);

                    if (error.response.status === 500) {
                        setServerError(true);
                    }
                    else if (error.response.status === 400) {
                        setNoInput(true);
                    }
                })
        }
    }

    const handleCustomerChange = (event) => {
        setCustomer(event.target.value);

        const found = customers.find((elem) => elem._id == event.target.value);
 
        setCity(found.address.city)
        setPostalCode(found.address.postalCode)
        setProvince(found.address.province)
        setStreet(found.address.street)
    }

    const handleCutomerType = (event) => {
        setCustType(event.target.value);
        if (event.target.value == "new") {
            setCity('')
            setPostalCode('')
            setProvince('')
            setStreet('')
        } else {
            setCustomer('');
        }
    }

    const handleCheckbox = () => {
        if (checked == false) {
            setChecked(true);
            setQuCity(city)
            setQuPostalCode(postalCode)
            setQuProvince(province)
            setQuStreet(street)
        } else {
            setChecked(false);
            setQuCity('');
            setQuPostalCode('');
            setQuProvince('');
            setQuStreet('');
        }

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
                    <Box sx={{
                        margin: "auto",
                        width: '80%'
                    }}>
                        <FormControl >
                            <FormLabel id="customertype">Please select One</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={custType}
                                onChange={handleCutomerType}
                            >
                                <FormControlLabel value="new" control={<Radio />} label="New Customer" />
                                <FormControlLabel value="returning" control={<Radio />} label="Returning Customer" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    {(custType === "new") ? (
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
                                defaultValue={"Calgary"}
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
                                defaultValue={"Alberta"}
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
                    ) : (
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
                                select
                                required
                                fullWidth
                                variant='filled'
                                label="Cutomer"
                                value={customer}
                                onChange={handleCustomerChange}
                                name="customerID"
                                id="customerID"
                                sx={{ gridColumn: "span 1" }}
                            >
                                {customers.map((cstmr) => (
                                    <MenuItem key={cstmr._id} value={cstmr._id} >
                                        {cstmr.firstName + ' ' + cstmr.lastName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    )}
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
                    </Box >
                    <Typography
                        variant="h3"
                        sx={{
                            m: "30px auto 5px auto",
                            width: '83%',
                            pb: '10px',
                        }}>
                        <b>Location</b>
                    </Typography>
                    <Box sx={{
                        margin: "auto",
                        width: '80%'
                    }}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={checked} onChange={handleCheckbox} />} label="Same As Customer Address" />
                        </FormGroup>
                    </Box>
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
                            required
                            type="text"
                            variant='filled'
                            label="Address"
                            name="address"
                            id="address"
                            value={qustreet}
                            onChange={(e) => setQuStreet(e.target.value)}
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
                            value={qupostalCode}
                            onChange={(e) => setQuPostalCode(e.target.value)}
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
                            value={qucity}
                            defaultValue={"Calgary"}
                            onChange={(e) => setQuCity(e.target.value)}
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
                            value={quprovince}
                            defaultValue={"Alberta"}
                            onChange={(e) => setQuProvince(e.target.value)}
                            sx={{ gridColumn: "2/3" }}
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
                                borderRadius: '3px',
                                color: 'white'
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