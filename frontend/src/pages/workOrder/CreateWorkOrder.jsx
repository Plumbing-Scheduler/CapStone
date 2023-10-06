import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Typography } from '@mui/material';
import Header from '../../components/Header';


const CreateWorkOrder = () => {
    const serviceStatus = 1 //Newly created work orders will always be set to "1" for in progress. 
    const [description, setDescription] = useState('');
    const [s_startDate, setS_StartDate] = useState(null);
    const [cost, setCost] = useState(null);
    const [assignedEmp, setAssignedEmp] = useState('');
    const [endDate, setEndDate] = useState(null);
    const [customerID, setCustomerID] = useState('');
    const [busName, setBusName] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const data = {
        serviceStatus,
        description,
        s_startDate,
        cost,
        assignedEmp,
        endDate,
        customerID,
        busName,
        address,
    };

    const handleSave = () => {
        axios
            .post('http://localhost:3500', data)
            .then(
                navigate('/WorkOrder')
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
            <form >
                <Typography display="flex" variant="h4" justifyContent="space-between" sx={{ m: "30px 0 10px 0" }}>Customer Information</Typography>
                <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{ gridColumn: "span 4" }} >
                    <TextField
                        fullWidth
                        multiline
                        variant="filled"
                        label="Description"
                        value={description}
                        cols="30"
                        rows="4"
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        id=""
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        fullWidth
                        type="date"
                        variant="filled"
                        label="Start Date"
                        value={s_startDate}
                        onChange={(e) => setDescription(e.target.value)}
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
                        onChange={(e) => setDescription(e.target.value)}
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
                        onChange={(e) => setDescription(e.target.value)}
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
                        onChange={(e) => setDescription(e.target.value)}
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
                        onChange={(e) => setDescription(e.target.value)}
                        name="assignemployee"
                        id=""
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        type="number"
                        variant='filled'
                        label="Cost"
                        value={cost}
                        onChange={(e) => setDescription(e.target.value)}
                        name="cost"
                        id=""
                        sx={{ gridColumn: "span 2" }}
                    />
                    <button onClick={print}>PRINT</button>
                </Box>
            </form>
        </Box>
    )

}

export default CreateWorkOrder