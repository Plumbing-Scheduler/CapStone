import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Typography, Button, useTheme } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Header from '../../components/Header';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import MenuItem from '@mui/material/MenuItem';
import { tokens } from "../../theme";


export const CreateWorkOrder = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const serviceStatus = "In Progress" //Newly created work orders will always be set to "1" for in progress. 
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('')
    const [startDate, setStartDate] = useState(Date.now());
    const [cost, setCost] = useState('');
    const [assignedEmp, setAssignedEmp] = useState('');
    const [endDate, setEndDate] = useState(startDate);
    const [customerID, setCustomerID] = useState('');
    const [busName, setBusName] = useState('');
    const [address, setAddress] = useState('');

    const [employees, setEmployees] = useState([]);
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
        address,
    };

    useEffect(() => {
        axios.get('http://localhost:3500/employees')
            .then((responce) => {
                setEmployees(responce.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    })

    const handleSave = () => {
        axios
            .post('http://localhost:3500/workorders', newWorkOrder)
            .then((response) => {
                const newCal = {
                    title: response.data.title,
                    startDate: response.data.startDate,
                    endDate: response.data.endDate,
                    serviceId: response.data._id,
                    empId: response.data.assignedEmp,
                }
                axios
                    .post('http://localhost:3500/schedule', newCal)
                    .then((response) => {
                        console.log(response.data)
                        navigate('/workorder')
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error)
            });
    };


    return (
        <Box m="20px">
            <Header title="WORK ORDER" subtitle="Create Invoice" />
            <Box>
                <Typography
                    //display="flex"
                    variant="h4"
                    //justifyContent="space-between"
                    sx={{
                        m: "10px auto",
                        width: '100%',
                        textAlign: 'center'
                    }}>
                    Add Work Order Details
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
                    <TextField
                        fullWidth
                        type="text"
                        variant="filled"
                        label="Title"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        name="startdate"
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
                    <TextField
                        fullWidth
                        type="text"
                        variant='filled'
                        label="Business Name"
                        value={busName}
                        onChange={(e) => setBusName(e.target.value)}
                        name="businessname"
                        id=""
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        required
                        variant='filled'
                        type="text"
                        label="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        name="address"
                        id=""
                        sx={{ gridColumn: "span 2" }}
                    />
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
                        type="number"
                        variant='filled'
                        label="Cost"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        name="cost"
                        id=""
                        inputProps={{ min: 0 }}
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        type="number"
                        variant='filled'
                        label="Cutomer ID"
                        value={customerID}
                        onChange={(e) => setCustomerID(e.target.value)}
                        name="cost"
                        id=""
                        sx={{ gridColumn: "span 1" }}
                    />

                </Box>

                <div className="flex justify-end mr-60">
                    <Button
                        onClick={handleSave}
                        sx={{
                            backgroundColor: colors.redAccent[500],
                            fontWeight: 'bold',
                            fontSize: '13px',
                            width: '15%',
                            borderRadius: '3px'
                        }}
                    >
                        Save and Add
                    </Button>
                </div>
            </Box>
        </Box>
    )

}

export default CreateWorkOrder