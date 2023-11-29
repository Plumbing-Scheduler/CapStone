import React, { useState, useEffect } from 'react';
import axiosInstance from "../axiosInstance";
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import MenuItem from '@mui/material/MenuItem';
import { tokens } from "../theme";
import { titles, paymentTypes } from '../data/types';
import {woStatusOptions } from '../data/types'

export const ReportFilter = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-diwth:600px)");
    const [paymentType, setPaymentType] = useState('');
    const [serviceType, setServiceType] = useState('')
    const [startDate, setStartDate] = useState(dayjs(Date.now()).startOf('month'));
    const [assignedEmp, setAssignedEmp] = useState('');
    const [endDate, setEndDate] = useState(Date.now());
    const [customer, setCustomer] = useState('');
    const [busName, setBusName] = useState('');
    const [serviceStatus, setServiceStatus] = useState('');
    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    dayjs.extend(localizedFormat);

    const generateReport = {
        serviceType,
        paymentType,
        startDate,
        assignedEmp,
        endDate,
        customer,
        busName,
        serviceStatus
    };

    useEffect(() => {
        axiosInstance
        .get('/employees')
            .then((responce) => {
                setEmployees(responce.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

            axiosInstance
            .get('/customer')
            .then((responce) => {
                setCustomers(responce.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const generate = () => {
        navigate(`history/${JSON.stringify(generateReport)}`)
    };

    return (
        <Box >
            <Box m="30px">
                <Box sx={{ width: "70%", m: "auto", boxShadow: '4', borderRadius: '5px', backgroundColor: colors.primary[400] }}>
                    <Typography
                        variant='h3'
                        textAlign={'left'}
                        mt={2}
                        p={2}
                    >
                        Search Reports
                    </Typography>

                    <Box
                        display="grid"
                        gap="20px"
                        p="20px"
                        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                        sx={{
                            "& > div:": { gridColumn: isNonMobile ? undefined : "span 2" },
                        }} >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label='Start Date'
                                renderInput={(params) => <TextField variant="filled" required {...params} />}
                                value={dayjs(startDate).toISOString()}
                                onChange={(e) => { setStartDate(e) }}
                                minutesStep={5}

                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label='End Date'
                                renderInput={(params) => <TextField fullWidth variant="filled" required {...params} />}
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
                            sx={{ gridColumn: "span 4", zIndex: 0 }}
                        />
                         <TextField
                            select
                            variant='filled'
                            label="Customer"
                            value={customer}
                            onChange={(e) => setCustomer(e.target.value)}
                            name="assignemployee"
                            id=""
                            sx={{ gridColumn: "span 4" }}
                        >
                            {customers.map((cus) => (
                                <MenuItem key={cus._id} value={cus._id}>
                                    {cus.firstName + ' ' + cus.lastName + " (" + cus.phone + ")"}
                                </MenuItem>
                            ))}</TextField>

                         <TextField
                            fullWidth
                            select
                            type="text"
                            variant="filled"
                            label="Payment Type"
                            value={paymentType}
                            onChange={(e) => setPaymentType(e.target.value)}
                            name="startdate"
                            id=""
                            sx={{ gridColumn: "span 4" }}
                        >{paymentTypes.map((ttl) => (
                            <MenuItem key={ttl.value} value={ttl.value}>
                                {ttl.label}
                            </MenuItem>
                        ))}</TextField>
                        <TextField
                            select
                            fullWidth
                            type="text"
                            variant="filled"
                            label="Status"
                            value={serviceStatus}
                            required
                            onChange={(e) => setServiceStatus(e.target.value)}
                            name="Status"
                            id="Status"
                            sx={{ gridColumn: "span 4" }}
                        >
                            {woStatusOptions.map((sts) => (
                                <MenuItem key={sts.value} value={sts.value}>
                                    {sts.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            fullWidth
                            select
                            type="text"
                            variant="filled"
                            label="Service"
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                            name="startdate"
                            id=""
                            sx={{ gridColumn: "span 4" }}
                        >{titles.map((ttl) => (
                            <MenuItem key={ttl.value} value={ttl.value}>
                                {ttl.label}
                            </MenuItem>
                        ))}</TextField>

                        <TextField
                            select
                            variant='filled'
                            label="Employee"
                            value={assignedEmp}
                            onChange={(e) => setAssignedEmp(e.target.value)}
                            name="assignemployee"
                            id=""
                            sx={{ gridColumn: "span 4" }}
                        >
                            {employees.map((emp) => (
                                <MenuItem key={emp._id} value={emp._id}>
                                    {emp.firstName + ' ' + emp.lastName}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Box ml="100%" width="50%">
                                <Button
                                    onClick={generate}
                                    sx={{
                                        backgroundColor: colors.redAccent[500],
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                        borderRadius: '3px',
                                        color: 'white',
                                        margin: 'auto'
                                    }}
                                >
                                    Run Report
                                </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ReportFilter