import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import Spinner from 'react-bootstrap/esm/Spinner';
import Header from '../../components/Header';
import MenuItem from '@mui/material/MenuItem';

export const CreateWorkOrder = () => {

    const [serviceStatus, setServiceStatus] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('')
    const [startDate, setStartDate] = useState(Date.now());
    const [cost, setCost] = useState('');
    const [assignedEmp, setAssignedEmp] = useState("");
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
        axiosInstance
            .get(`/workorders/${id}`)
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
                axiosInstance.get('/employees')
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
            .then(
                navigate('/workorder')
            )
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
    };


    return (


        <Box m="20px">
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
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            gridColumn: "span 4",
                            margin: "auto",
                            width: '75%'
                        }} >
                        {serverError &&
                        <Alert severity="error">
                            <AlertTitle>Server Error</AlertTitle>
                                Internal Server Error. Please Try Again Later.
                        </Alert>}

                        {noInput &&
                        <Alert severity="warning">
                            <AlertTitle>Warning</AlertTitle>
                                Please Fill Out All Fields
                        </Alert>}
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
                                renderInput={(params) => <TextField {...params} />}
                                value={dayjs(startDate).toISOString()}
                                onChange={(e) => { setStartDate(e) }}
                                minutesStep={5}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label='End Date'
                                renderInput={(params) => <TextField {...params} />}
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
                            sx={{ gridColumn: "span 2" }}
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
                        <button onClick={handleSave} className='bg-gray-500 w-1/2 '>
                            Save and Add
                        </button>
                    </Box>
                </div>)}
        </Box>

    )

}

export default CreateWorkOrder

