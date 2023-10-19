import { Box, TextField, Typography } from "@mui/material";
import Header from "../../components/Header";
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import useMediaQuery from '@mui/material/useMediaQuery';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
//start of Marcus' Code

//Dropdown constants for education
const educationOptions = [
    {
        value: 'journeyman',
        label: 'Journeyman'
    },
    {
        value: 'apprentice1',
        label: 'Apprentice First Year'
    },
    {
        value: 'apprentice2',
        label: 'Apprentice Second Year'
    },
    {
        value: 'apprentice3',
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

export const CreateEmployee = () => {
const minwidth1 = useMediaQuery('(min-width:800px)');
const minwidth2 = useMediaQuery('(min-width:500px)');

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [street, setStreet] = useState('');
const [postalCode, setPostalCode] = useState('');
const [city, setCity] = useState('');
const [province, setProvince] = useState('');
const [role, setRole] = useState('');
const [employmentType, setEmploymentType] = useState('');
const [status, setStatus] = useState('');
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
    startDate,
    employmentType,
    status
}

const handleSave = () => {
    axios
        .post('http://localhost:3500/employees', newEmployee)
        .then(
            navigate('/employee')
        )
        .catch((error) => {
            console.log(error)
        })
}
    return (
        <Box m="10px auto" width={"90%"} >
            <Header title="EMPLOYEE" subtitle="NEW EMPLOYEE" />
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
                gridTemplateColumns={ minwidth1 ? "repeat(4, minmax(0, 1fr))" : minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
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
                    onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => {setStartDate(dayjs(e).toISOString())}}
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
                <button onClick={handleSave} className='bg-gray-500 w-auto m-auto'>
                    Save and Add
                </button>
        </Box>
    )
}
export default CreateEmployee
//End of Marcus' code