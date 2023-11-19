import { Alert, AlertTitle, Box, TextField, Typography, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from "../../axiosInstance.js";
import useMediaQuery from '@mui/material/useMediaQuery';
import { tokens } from "../../theme.js";
import Spinner from 'react-bootstrap/esm/Spinner';


export const EditCustomer = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState(false);
    const { id } = useParams({});
    const minwidth1 = useMediaQuery('(min-width:800px)');
    const minwidth2 = useMediaQuery('(min-width:500px)');
    const [ serverError, setServerError ] = useState(false);
    const [ noInput, setNoInput ] = useState(false);

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

    const updateCustomer = {
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

    useEffect(() => {
        setLoading(true);

        axiosInstance
            .get(`/customer/${id}`)
            .then((response) => {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setPhone(response.data.phone)
                setEmail(response.data.email)
                setBusName(response.data.busName)
                setPostalCode(response.data.address.postalCode)
                setStreet(response.data.address.street)
                setCity(response.data.address.city)
                setProvince(response.data.address.province)
                setLoading(false)
            })
            .catch((error) => {
                setServerError(false);
                setNoInput(false);
                console.log(error.response.status)
                if (error.response.status === 500) {
                    setServerError(true);
                }
                else if (error.response.status === 404) {
                    setNoInput(true);
                }
            })
    }, [])

    const handleSave = () => {
        axiosInstance
        .put(`/customer/${id}`, updateCustomer)
        .then(() => {
            navigate('/customers')
        }
        )
        .catch((error) => {
            console.log(error)
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
            <Header title="CUSTOMER" subtitle="NEW CUSTOMER" />
            {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
                <Box m="10px auto" p={"0 0 30px 0"} width={"90%"} >
                    <Typography
                        variant="h4"
                        sx={{
                            m: "30px auto 5px auto",
                            width: '75%',
                        }}>
                        Customer Information
                    </Typography>
                    <Box
                        display="grid"
                        gap="20px"
                        gridTemplateColumns={minwidth1 ? "repeat(2, minmax(0, 1fr))" : minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
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
                            type="number"
                            variant='filled'
                            label="Phone"
                            name="phone #"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                                Please Fill Out All Fields
                            </Alert>}
                    </Box>
                    <div className="flex justify-end mr-36 pt-3">
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
            )}
        </Box>
    )
}
export default EditCustomer
