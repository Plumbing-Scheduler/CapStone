import React, { useState, useEffect } from 'react'
import { Box, Typography, TextField } from "@mui/material";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/esm/Spinner';
import Header from '../../components/Header';
const EditQuote = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [cost, setCost] = useState('');
    const [busName, setBusName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const data = {
        firstName,
        lastName,
        phone,
        description,
        address,
        cost,
        busName,
        email,
    }

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3500/quote/${id}`)
            .then((responce) => {
                setFirstName(responce.data.firstName);
                setLastName(responce.data.lastName);
                setPhone(responce.data.phone);
                setDescription(responce.data.description);
                setAddress(responce.data.address);
                setCost(responce.data.cost);
                setBusName(responce.data.busName);
                setEmail(responce.data.email);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            })

    }, [])

    const handleSave = () => {
        axios
            .put(`http://localhost:3500/quote/${id}`, data)
            .then(
                navigate('/quotes')
            )
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <Box>
            <Header title={"QUOTE REQUEST"} subtitle={"EDIT QUOTE DETAILS"} />
            {loading ? (
                <div className='w-5 m-auto h-5 pt-11 text-center'>
                    <Spinner />
                </div>
            ) : (
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            m: "10px auto",
                            width: '80%',
                            textAlign: 'center'
                        }}>
                        Update Quote Request
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
                            type="number"
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
                        <button onClick={handleSave} className='bg-gray-500 w-1/2 h-12 rounded-sm'>
                            Save and Add
                        </button>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default EditQuote