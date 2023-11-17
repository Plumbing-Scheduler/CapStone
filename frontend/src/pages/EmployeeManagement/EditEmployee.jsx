import { Alert, AlertTitle, Box, TextField, Typography, Button, useTheme, NativeSelect } from "@mui/material";
import Header from "../../components/Header";
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from "../../axiosInstance.js";
import useMediaQuery from '@mui/material/useMediaQuery';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { tokens } from "../../theme.js";
import Spinner from 'react-bootstrap/esm/Spinner';


//Dropdown constants for education
const educationOptions = [
    {
        value: 'Journeyman',
        label: 'Journeyman'
    },
    {
        value: 'Apprentice First Year',
        label: 'Apprentice First Year'
    },
    {
        value: 'Apprentice Second Year',
        label: 'Apprentice Second Year'
    },
    {
        value: 'Apprentice Third Year',
        label: 'Apprentice Third Year'
    }
]
//Dropdown constants for employment
const employmentOptions = [
    {
        value: 'Full Time',
        label: 'Full Time'
    },
    {
        value: 'Part Time',
        label: 'Part Time'
    }
]
//dropdown constants for status
const statusOptions = [
    {
        value: 'Active',
        label: 'Active'
    },
    {
        value: 'Inactive',
        label: 'Inactive'
    }
]

export const EditEmployee = () => {
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

    dayjs.extend(localizedFormat);
    const navigate = useNavigate();

    const newEmployee = {
        firstName,
        lastName,
        email,
        phone,
        address: {
            street,
            postalCode,
            city,
            province
        },
        role,
        experience,
        startDate,
        employmentType,
        status,
        password
    }

    useEffect(() => {
        setLoading(true);

        axiosInstance
            .get(`/employees/${id}`)
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
                setPassword(response.data.password);
                setLoading(false)
            }).catch((error) => {
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
            .put(`/employees/${id}`, newEmployee)
            .then(() => {
                navigate('/employee')
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
        <Box ml={'20px'}>
            <Header title="EMPLOYEE" subtitle="EDIT EMPLOYEE" />
            {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
                <Box m="10px auto" p={"0 0 30px 0"} width={"90%"} >

                    <Typography
                        //display="flex"
                        variant="h4"
                        //justifyContent="space-between"
                        sx={{
                            m: "30px auto 5px auto",
                            width: '75%',
                        }}>
                        Employee Information
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
                            label="Email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.toLowerCase())}
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
                            sx={{ gridColumn: "span 1" }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                required
                                label='Start Date'
                                renderInput={(params) => <TextField variant="filled" required {...params} />}
                                value={startDate}
                                onChange={(e) => { setStartDate(dayjs(e).toISOString()) }}
                                orientation="landscape"
                            />
                        </LocalizationProvider>
                    </Box>

                    <Typography
                        //display="flex"
                        variant="h4"
                        //justifyContent="space-between"
                        sx={{
                            m: "30px auto 5px auto",
                            width: '75%',
                        }}>
                        Education
                    </Typography>

                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns={minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
                        sx={{
                            gridColumn: "span 4",
                            margin: "auto",
                            width: '75%'
                        }}
                    >
                        <TextField
                            select
                            required
                            label="Education Level"
                            variant='filled'
                            name="educationLevel"
                            id="education"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            sx={{ gridColumn: "span 1" }}
                        >
                            {educationOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            type="number"
                            variant='filled'
                            label="Years of Experience"
                            name="yearsofExperience"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            sx={{ gridColumn: "span 1" }}
                        />
                    </Box>

                    <Typography
                        //display="flex"
                        variant="h4"
                        //justifyContent="space-between"
                        sx={{
                            m: "30px auto 5px auto",
                            width: '75%',
                        }}>
                        Hours
                    </Typography>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns={minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
                        sx={{
                            gridColumn: "span 4",
                            margin: "auto",
                            width: '75%',

                        }}
                    >
                        <TextField
                            select
                            required
                            label="Employment Type"
                            variant='filled'
                            name="employmentType"
                            id="employmentType"
                            value={employmentType}
                            onChange={(e) => setEmploymentType(e.target.value)}
                            sx={{ gridColumn: "span 1" }}
                        >
                            {employmentOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            required
                            label="Status"
                            variant='filled'
                            name="status"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            sx={{ gridColumn: "span 1" }}
                        >
                            {statusOptions.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box sx={{width: "30%", margin: "10px auto"}}>
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
                    <Box
                        backgroundColor={colors.buttonBase}
                        display="grid"
                        sx={{
                            margin: "10px auto",
                            width: '150px',
                            borderRadius: "5px"
                        }}
                    >
                        <Button variant="Text" onClick={handleSave} backgroundcolor={colors.buttonBase}>
                            Save and Add
                        </Button>
                    </Box>

                </Box>
            )}
        </Box>
    )
}
export default EditEmployee
//End of Marcus' code