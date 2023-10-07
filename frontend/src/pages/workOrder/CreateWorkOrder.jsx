import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Typography } from '@mui/material';

import Header from '../../components/Header';


const CreateWorkOrder = () => {
    const serviceStatus = 1 //Newly created work orders will always be set to "1" for in progress. 
    const [s_description, setDescription] = useState('');
    const [title, setTitle] = useState('')
    const [s_startDate, setStartDate] = useState('');
    const [s_cost, setCost] = useState('');
    const [assignedEmp, setAssignedEmp] = useState('N/A');
    const [endDate, setEndDate] = useState('');
    const [customerID, setCustomerID] = useState('N/A');
    const [busName, setBusName] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const data = {
        serviceStatus,
        s_description,
        title,
        s_startDate,
        s_cost,
        assignedEmp,
        endDate,
        customerID,
        busName,
        address,
    };

    const handleSave = () => {
        axios
            .post('http://localhost:3500/workorders', data)
            .then(
                navigate('/workorder')
            )
            .catch((error) => {
                console.log(error)
            })
    };
    const print = () => {
        console.log(data);
    }

    return (
        <Box m="20px">
            <Header title="WORK ORDER" subtitle="Create Invoice" />

            <Typography
                //display="flex"
                variant="h4"
                //justifyContent="space-between"
                sx={{ 
                    m: "10px auto", 
                    width: '20%',
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
                    value={s_description}
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
                <TextField
                    fullWidth
                    type="date"
                    variant="filled"
                    label="Start Date"
                    value={s_startDate}
                    required
                    onChange={(e) => setStartDate(e.target.value)}
                    name="startdate"
                    id=""
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    type="date"
                    variant="filled"
                    label="End Date"
                    value={endDate}
                    required
                    onChange={(e) => setEndDate(e.target.value)}
                    name="enddate"
                    id=""
                    sx={{ gridColumn: "span 2" }}
                />
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
                    fullWidth
                    type="text"
                    variant='filled'
                    label="Assign Employee"
                    value={assignedEmp}
                    onChange={(e) => setAssignedEmp(e.target.value)}
                    name="assignemployee"
                    id=""
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    type="number"
                    variant='filled'
                    label="Cost"
                    value={s_cost}
                    onChange={(e) => setCost(e.target.value)}
                    name="cost"
                    id=""
                    sx={{ gridColumn: "span 1" }}
                />
                <button onClick={handleSave} className='bg-gray-500 w-1/2 '>
                    Save and Add
                </button>
            </Box>

        </Box>
    )

}

export default CreateWorkOrder