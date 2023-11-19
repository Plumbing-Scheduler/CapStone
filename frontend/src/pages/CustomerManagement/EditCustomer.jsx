import { Box, TextField, Typography, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
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

        axios
            .get(`http://localhost:3500/customer/${id}`)
            .then((responce) => {
                setFirstName(responce.data.firstName)
                setLastName(responce.data.lastName)
                setPhone(responce.data.phone)
                setEmail(responce.data.email)
                setBusName(responce.data.busName)
                setPostalCode(responce.data.address.postalCode)
                setStreet(responce.data.address.street)
                setCity(responce.data.address.city)
                setProvince(responce.data.address.province)

                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }, [])

    const handleSave = () => {
        axios
            .put(`http://localhost:3500/customer/${id}`, updateCustomer)
            .then(
                navigate('/customers')
            )
            .catch((error) => {
                console.log(error)
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
