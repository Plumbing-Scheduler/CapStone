import { Alert, AlertTitle, Box, TextField, Typography, Button, useTheme, Divider } from "@mui/material";
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
import { Roles, employmentOptions, empStatusOptions } from '../../data/types.js'

export const EditEmployee = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState(false);
    const { id } = useParams({});
    const minwidth1 = useMediaQuery('(min-width:800px)');
    const minwidth2 = useMediaQuery('(min-width:500px)');
    const [serverError, setServerError] = useState(false);
    const [noInput, setNoInput] = useState(false);

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

    const saveEmployee = {
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
            .put(`/employees/${id}`, saveEmployee)
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

    const formatPhone = (event) => {
        let num = event.target.value;
        num = num.replace(/\D/, '');
        console.log(num)
        setPhone(num)
    }

    return (
        <Box>
            <Header title="EMPLOYEE" subtitle="Edit Employee" />
            {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
                <div className={`shadow-lg mt-3 `}>
                    <Divider variant="middle" sx={{ pt: '20px' }} />
                    <Typography
                        variant="h3"
                        sx={{
                            m: "30px auto 5px auto",
                            width: '83%',
                            pb: '10px',
                        }}>
                        <b>Employee Information</b>
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
                    </Box>
                    {/**EMPLOYMENT INFO HERE BELOW--------------------------------------------------------------- */}
                    <Typography
                        variant="h3"
                        sx={{
                            m: "30px auto 5px auto",
                            width: '83%',
                            pb: '10px',
                        }}>
                        <b>Employement type</b>
                    </Typography>

                    <Box
                        display="grid"
                        gap="20px"
                        gridTemplateColumns={minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
                        sx={{
                            gridColumn: "span 4",
                            margin: "auto",
                            width: '80%'
                        }}
                    >
                        <TextField
                            select
                            required
                            label="Role"
                            variant='filled'
                            name="role"
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            sx={{ gridColumn: "span 1" }}
                        >
                            {Roles.map((option) => (
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
                        <TextField
                            select
                            required
                            label="Full-Time/Part-Time"
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
                            {empStatusOptions.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                required
                                label='Start Date'
                                renderInput={(params) => <TextField variant="filled" required {...params} sx={{ gridColumn: "2/3" }}  />}
                                value={startDate}
                                onChange={(e) => { setStartDate(dayjs(e).toISOString()) }}
                                orientation="landscape"
                            />
                        </LocalizationProvider>
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
                            Save and Add
                        </Button>
                    </div>
                </div>
            )}
        </Box>
    )
}
export default EditEmployee