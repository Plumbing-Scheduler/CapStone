import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertTitle, Box, TextField, Typography, Button, useTheme } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Header from '../../components/Header';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import MenuItem from '@mui/material/MenuItem';
import { tokens } from "../../theme";
import useMediaQuery from '@mui/material/useMediaQuery';
import { titles } from '../../data/types'

export const CreateWorkOrder = () => {
    const [serverError, setServerError] = useState(false);
    const [noInput, setNoInput] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const minwidth1 = useMediaQuery('(min-width:800px)');
    const minwidth2 = useMediaQuery('(min-width:500px)');
    const serviceStatus = 'New';
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('')
    const [startDate, setStartDate] = useState(Date.now());
    const [cost, setCost] = useState('');
    const [assignedEmp, setAssignedEmp] = useState('');
    const [endDate, setEndDate] = useState(startDate);
    const [customerID, setCustomerID] = useState('');
    const [busName, setBusName] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');

    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    dayjs.extend(localizedFormat);



    const newWorkOrder = {
        serviceStatus,
        description,
        title,
        startDate,
        cost,
        assignedEmp,
        endDate,
        customerID,
        busName,
        address: {
            street,
            postalCode,
            city,
            province
        }
    };

    useEffect(() => {
        axiosInstance
            .get('/employees')
            .then((response) => {
                setEmployees(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
        axiosInstance
            .get('/customer')
            .then((response) => {
                setCustomers(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleSave = () => {
        axiosInstance
            .post('/workorders', newWorkOrder)
            .then((response) => {
                const newCal = {
                    title: response.data.title,
                    startDate: response.data.startDate,
                    endDate: response.data.endDate,
                    serviceId: response.data._id,
                    empId: response.data.assignedEmp,
                    notes: response.data.description,
                    address: {
                        street: response.data.address.street,
                        postalCode: response.data.address.postalCode,
                        city: response.data.address.city,
                        province: response.data.address.province,
                    }
                }
                axiosInstance
                    .post('/schedule', newCal)
                    .then((response) => {
                        console.log(response.data)
                        navigate('/workorder')
                    })
                    .catch((error) => {
                        console.log(error);
                    });
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
            });
    };


    return (
        <Box >
            <Header title="WORK ORDER" subtitle="Create Invoice" />
            <Box >
                <div className={`shadow-lg ml-5 mr-2 pt-3`}>
                    <Typography
                        variant="h3"
                        sx={{
                            m: "10px auto",
                            width: '75%',
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
                            width: '75%',
                        }} >
                        <TextField
                            select
                            fullWidth
                            type="text"
                            variant="filled"
                            label="Title"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            name="startdate"
                            id=""
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
                            type="text"
                            variant='filled'
                            label="Business Name"
                            value={busName}
                            onChange={(e) => setBusName(e.target.value)}
                            name="businessname"
                            id=""
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            multiline
                            variant="filled"
                            label="Description"
                            value={description}
                            required
                            cols="30"
                            rows="4"
                            onChange={(e) => setDescription(e.target.value)}
                            name="description"
                            id=""
                            sx={{ gridColumn: "span 2" }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label='Start Date'
                                renderInput={(params) => <TextField variant="filled" required {...params} />}
                                value={dayjs(startDate).toISOString()}
                                onChange={(e) => { setStartDate(e) }}
                                minutesStep={5}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label='End Date'
                                renderInput={(params) => <TextField variant="filled" required {...params} />}
                                value={dayjs(endDate).toISOString()}
                                onChange={(e) => { setEndDate(e) }}
                                minDate={startDate}
                                minutesStep={5}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Typography
                        variant="h3"
                        sx={{
                            m: "10px auto",
                            width: '75%',
                            pt: "20px"
                        }}>
                        <b>Customer Information</b>
                    </Typography>
                    <Box
                        display="grid"
                        gap="20px"
                        gridTemplateColumns={minwidth1 ? "repeat(2, minmax(0, 1fr))" : minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
                        sx={{
                            gridColumn: "span 2",
                            margin: "auto",
                            width: '75%'
                        }}>
                        <TextField
                            select
                            required
                            fullWidth
                            type="number"
                            variant='filled'
                            label="Cutomer ID"
                            value={customerID}
                            onChange={(e) => setCustomerID(e.target.value)}
                            name="cost"
                            id=""
                            sx={{ gridColumn: "span 1" }}
                        >
                            {customers.map((cstmr) => (
                                <MenuItem key={cstmr._id} value={cstmr._id}>
                                    {cstmr.firstName + ' ' + cstmr.lastName}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            required
                            variant='filled'
                            label="Assign Employee"
                            value={assignedEmp}
                            onChange={(e) => setAssignedEmp(e.target.value)}
                            name="assignemployee"
                            id=""
                            sx={{ gridColumn: "span 1" }}
                        >
                            {employees.map((emp) => (
                                <MenuItem key={emp._id} value={emp._id}>
                                    {emp.firstName + ' ' + emp.lastName}
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
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            type="number"
                            variant='filled'
                            label="Cost"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            name="cost"
                            id="cost"
                            inputProps={{ min: 0 }}
                            sx={{ gridColumn: "2/3" }}
                        />
                    </Box>
                    <Box sx={{ width: "13%", margin: "10px auto" }}>
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
                    <div className="flex justify-end mr-40 pt-4 pb-5">
                        <Button
                            onClick={handleSave}
                            sx={{
                                backgroundColor: colors.redAccent[500],
                                fontWeight: 'bold',
                                fontSize: '13px',
                                width: minwidth1 ? 'auto' : minwidth2 ? '80%' : '100%',
                                borderRadius: '3px',
                                color: "white"
                            }}
                        >
                            Save and Add
                        </Button>
                    </div>
                </div>
            </Box>
        </Box>
    )

}

export default CreateWorkOrder