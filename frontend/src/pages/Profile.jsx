import { Box, Typography, useTheme, TextField, Button, Alert, AlertTitle } from '@mui/material'
import { useEffect, useState } from 'react'
import { tokens } from "../theme.js";
import axiosInstance from '../axiosInstance.js';
import dayjs from 'dayjs';

const Profile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const LoggedInUser = JSON.parse(localStorage.getItem("user"));
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [role, setRole] = useState('');
    const [experience, setExperience] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [status, setStatus] = useState('');
    const [password, setPassword] = useState('');
    const [startDate, setStartDate] = useState(Date.now());

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [pcSuccess, setPcSuccess] = useState(false);
    const [pcFail, setPcFail] = useState(false);
    const [serverError, setServerError] = useState(false);

    const changePassword = () => {
        const passChange = {
            oldPassword,
            newPassword,
        }
        setPcSuccess(false);
        setPcFail(false);
        setServerError(false);
        axiosInstance
            .put(`/employees/password/${LoggedInUser.id}`, passChange)
            .then((response) => {
                if (response.status === 200) {
                setPcSuccess(true);
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    setPcFail(true);
                }
                if (err.response.status === 500) {
                    setServerError(true);
                }

            });
    }

    useEffect(() => {
        axiosInstance
            .get(`/employees/${LoggedInUser.id}`)
            .then((response) => {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
                setPhone(response.data.phone)
                setPostalCode(response.data.address.postalCode)
                setStreet(response.data.address.street)
                setCity(response.data.address.city)
                setProvince(response.data.address.province)
                setStartDate(response.data.startDate)
                setRole(response.data.role)
                setExperience(response.data.experience)
                setEmploymentType(response.data.employmentType)
                setStatus(response.data.status)
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);

    return (
        <Box sx={{ width: "400px", margin: "0 auto" }}>
            <div className='shadow-lg m-4 p-3'>
                <Typography variant='h3'>
                    Profile
                </Typography>
                <Box
                    display="grid"
                    m={"20px 0"}
                    gap={"20px"}
                    sx={{ gridColumn: "span 2" }}
                    gridTemplateColumns={"repeat(1, minmax(0, 1fr))"}>
                    <Box
                        display="grid"
                        sx={{ gridColumn: "span 1" }}
                        gridTemplateColumns={"repeat(2, minmax(0, 1fr))"}
                    >
                        <Box sx={{ gridColumn: "span 1" }}>
                            <Typography variant='h5'>
                                First Name
                            </Typography>
                            <TextField
                                size="small"
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                sx={{ width: '160px' }} />
                        </Box>
                        <Box sx={{ gridColumn: "span 1" }}>
                            <Typography variant='h5'>
                                Last Name
                            </Typography>
                            <TextField
                                size="small"
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                sx={{ width: '160px' }} />
                        </Box>

                    </Box>
                    <Box sx={{ gridColumn: "span 1" }}>
                        <Typography variant='h5'>
                            Email
                        </Typography>
                        <TextField
                            size="small"
                            type="text"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ width: '100%' }} />
                    </Box>
                    <Box sx={{ gridColumn: "span 1" }}>
                        <Typography variant='h5'>
                            Phone
                        </Typography>
                        <TextField
                            size="small"
                            type="number"
                            name="phone"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            sx={{ width: '100%' }} />
                    </Box>
                    <Box sx={{ gridColumn: "span 1" }}>
                        <Typography variant='h5'>
                            Street
                        </Typography>
                        <TextField
                            size="small"
                            type="text"
                            name="street"
                            id="street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            sx={{ width: '100%' }} />
                    </Box>
                    <Box sx={{ gridColumn: "span 1" }}>
                        <Typography variant='h5'>
                            Postal Code
                        </Typography>
                        <TextField
                            size="small"
                            type="text"
                            name="postalCode"
                            id="postalCode"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            sx={{ width: '100%' }} />
                    </Box>
                    <Box sx={{ gridColumn: "span 1" }}>
                        <Typography variant='h5'>
                            City
                        </Typography>
                        <TextField
                            size="small"
                            type="text"
                            name="city"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            sx={{ width: '100%' }} />
                    </Box>
                    <Box sx={{ gridColumn: "span 1" }}>
                        <Typography variant='h5'>
                            Province
                        </Typography>
                        <TextField
                            size="small"
                            type="text"
                            name="province"
                            id="province"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            sx={{ width: '100%' }} />
                    </Box>
                </Box>
                <Box
                    backgroundColor={colors.greenButton}
                    display="grid"
                    sx={{
                        margin: "10px auto",
                        width: '200px',
                        borderRadius: "5px"
                    }}
                >
                    <Button
                        variant="Text"
                        sx={{ fontWeight: "bold", color: "white" }}>
                        Save Changes
                    </Button>
                </Box>
            </div>
            <div className='shadow-lg m-4 p-3'>
                <Typography variant='h3'>
                    Employement Info
                </Typography>
                <Box
                    display="grid"
                    m={"20px 0"}
                    gap={"20px"}
                    sx={{ gridColumn: "span 2" }}
                    gridTemplateColumns={"repeat(1, minmax(0, 1fr))"}>

                    <Box>
                        <Typography variant='h5'>
                            Type
                        </Typography>
                        <TextField
                            size="small"
                            type="text"
                            disabled
                            value={employmentType}
                            sx={{ width: '100%' }} />
                    </Box>
                    <Box>
                        <Typography variant='h5'>
                            Status
                        </Typography>
                        <TextField
                            size="small"
                            type="text"
                            disabled
                            value={status}
                            sx={{ width: '100%' }} />
                    </Box>
                    <Box>
                        <Typography variant='h5'>
                            Start Date
                        </Typography>
                        <TextField
                            size="small"
                            type="date"
                            disabled
                            value={dayjs(startDate).format("YYYY-MM-DD")}
                            sx={{ width: '100%' }} />
                    </Box>
                </Box>
            </div>
            <div className='shadow-lg m-4 p-3'>
                <Typography variant='h3'>
                    Change Password
                </Typography>

                <TextField
                    type="password"
                    variant='standard'
                    label="Old Password"
                    name="password"
                    id="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    sx={{ margin: "10px auto", width: "100%" }} />
                <TextField
                    type="password"
                    variant='standard'
                    label="New Password"

                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    sx={{ margin: "10px auto", width: "100%" }} />
                <TextField
                    type="password"
                    variant='standard'
                    label="Confirm New Password"
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                    sx={{ margin: "10px auto", width: "100%" }} />

                {(newPassword != conPassword) &&
                    <Alert severity="error" variant="filled">
                        <AlertTitle>Passwords Do Not Match</AlertTitle>
                    </Alert>}

                {(newPassword.length < 8 && newPassword.length != 0) &&
                    <Alert severity="warning" variant="filled">
                        <AlertTitle>Password should be more than 8 Characters</AlertTitle>
                    </Alert>}

                {pcSuccess &&
                    <Alert severity="success" variant="filled">
                        <AlertTitle>Password Has Been Changed</AlertTitle>
                    </Alert>}

                {pcFail && 
                    <Alert severity="error" variant="filled">
                        <AlertTitle>Incorrect Old Password</AlertTitle>
                    </Alert>}

                {serverError &&
                    <Alert severity="error" variant="filled">
                        <AlertTitle>Server Error</AlertTitle>
                        Internal Server Error. Please Try Again Later.
                    </Alert>}

                <Box
                    display="grid"
                    sx={{
                        margin: "10px auto",
                        width: '200px',
                        borderRadius: "5px"
                    }}
                >
                    <Button
                        onClick={changePassword}
                        variant="contained"
                        color="error"
                        disabled={(newPassword != conPassword || newPassword.length < 8 && conPassword.length < 8) ? (true) : (false)}
                        sx={{ fontWeight: "bold", color: "white" }}>
                        Change pasword
                    </Button>
                </Box>

            </div>
        </Box>

    )
}

export default Profile;