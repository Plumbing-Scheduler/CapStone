import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField, Typography, Button, useTheme } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import Spinner from 'react-bootstrap/esm/Spinner';
import Header from '../../components/Header';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { tokens } from '../../theme';

export const CreateWorkOrder = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [serverError, setServerError] = useState(false);
    const [noInput, setNoInput] = useState(false);
    const minwidth1 = useMediaQuery('(min-width:800px)');
    const minwidth2 = useMediaQuery('(min-width:500px)');

    const [serviceStatus, setServiceStatus] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('')
    const [startDate, setStartDate] = useState(Date.now());
    const [cost, setCost] = useState('');
    const [assignedEmp, setAssignedEmp] = useState('');
    const [endDate, setEndDate] = useState(startDate);
    const [customerID, setCustomerID] = useState('');
    const [busName, setBusName] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const { id } = useParams('');
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);

    const data = {
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
        setLoading(true);
        axios
            .get(`http://localhost:3500/workorders/${id}`)
            .then((response) => {
                setServiceStatus(response.data.serviceStatus);
                setDescription(response.data.description);
                setTitle(response.data.title);
                setStartDate(response.data.startDate);
                setCost(response.data.cost);
                setAssignedEmp(response.data.assignedEmp);
                setEndDate(response.data.endDate);
                setCustomerID(response.data.customerID);
                setBusName(response.data.busName);
                setAddress(response.data.address);
                axios.get('http://localhost:3500/employees')
                    .then((responce) => {
                        setEmployees(responce.data.data);
                    })
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error)
            });
    }, [id])

    const handleSave = () => {
        axiosInstance
            .put(`/workorders/${id}`, data)
            .then(() => {
                const editedCalendar = {
                    title: data.title,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    serviceId: id,
                    empId: data.assignedEmp,
                    notes: data.description
                }
                axiosInstance
                    .put(`/schedule/${id}`, editedCalendar)
                    .then(() => {
                        navigate('/workorder')
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    };

    return (
        <Box>
            <Header title="WORK ORDER" subtitle="Update" />
            {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
                <div>
                    <Typography
                        //display="flex"
                        variant="h4"
                        //justifyContent="space-between"
                        sx={{
                            m: "10px auto",
                            width: '100%',
                            textAlign: 'center'
                        }}>
                        Update Work Order Details
                    </Typography>
                    <Box
                        display="grid"
                        gap="20px"
                        gridTemplateColumns={minwidth1 ? "repeat(2, minmax(0, 1fr))" : minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
                        sx={{
                            gridColumn: "span 2",
                            margin: "auto",
                            width: '75%'
                        }} >
                        <TextField
                            fullWidth
                            type="text"
                            variant="filled"
                            label="Title"
                            value={title}
                            required
                            onChange={e => setTitle(e.target.value)}
                            name="startdate"
                            id=""
                            sx={{ gridColumn: "span 2" }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label='Start Date'
                                renderInput={(params) => <TextField variant="filled" {...params} />}
                                value={dayjs(startDate).toISOString()}
                                onChange={(e) => { setStartDate(e) }}
                                minutesStep={5}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label='End Date'
                                renderInput={(params) => <TextField variant="filled" {...params} />}
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
                            onChange={e => setBusName(e.target.value)}
                            name="businessname"
                            id=""
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            required
                            variant='filled'
                            type="text"
                            label="Address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            name="address"
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
                            onChange={description => setDescription(description.target.value)}
                            name="description"
                            id="description"
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
                            onChange={e => setCost(e.target.value)}
                            name="cost"
                            id=""
                            inputProps={{ min: 0 }}
                            sx={{ gridColumn: "span 1" }}
                        />
                    </Box>
                    <div className="flex justify-end mr-40 pt-4">
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
                </div>)}
        </Box>

    )

}

export default CreateWorkOrder

