import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, AlertTitle, Box, TextField, Typography, Button, useTheme, Divider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import Spinner from 'react-bootstrap/esm/Spinner';
import Header from '../../components/Header';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { tokens } from '../../theme';
import { titles, paymentTypes, woStatusOptions } from '../../data/types'

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
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const navigate = useNavigate();
    const { id } = useParams('');
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);

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
        address: {
            street,
            postalCode,
            city,
            province
        },
        paymentType
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
                setPostalCode(response.data.address.postalCode)
                setStreet(response.data.address.street)
                setCity(response.data.address.city)
                setProvince(response.data.address.province)
                setPaymentType(response.data.paymentType)
                axiosInstance.get('/employees')
                    .then((response) => {
                        setEmployees(response.data.data);
                    })
                axiosInstance
                    .get('/customer')
                    .then((response) => {
                        setCustomers(response.data.data);
                    })
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error)
            });
    }, [])

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
                    notes: data.description,
                    ddress: {
                        street: data.street,
                        postalCode: data.postalCode,
                        city: data.city,
                        province: data.province,
                    }
                }
                axiosInstance
                    .put(`/schedule/${id}`, editedCalendar)
                    .then(() => {
                        navigate('/workorder')
                    })
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
            })
    };

    const handleChange = event => setCustomerID(event.target.value);

    return (
        <Box >
            <Header title="WORK ORDERS" subtitle="Edit Workorder" />
            {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
                <div className={`shadow-lg mt-3 `}>
                    <Divider variant="middle" sx={{pt: '20px'}} />
                    <Typography
                        variant="h3"
                        sx={{
                            m: "10px auto",
                            width: '83%',
                            pb: '10px'
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
                            width: '80%'
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
                            name="Title"
                            id="Title"
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
                            onChange={e => setBusName(e.target.value)}
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
                            onChange={description => setDescription(description.target.value)}
                            name="description"
                            id="description"
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
                    </Box>

                        <Typography
                            variant="h3"
                            sx={{
                                m: "10px auto",
                                width: '83%',
                                pt: "20px",
                                pb: '10px',
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
                            width: '80%',
                        }} >
                        <TextField
                            select
                            required
                            fullWidth
                            // type="text"
                            variant='filled'
                            label="Cutomer ID"
                            defaultValue=""
                            value={customerID}
                            onChange={handleChange}
                            name="customerID"
                            id=""
                            sx={{ gridColumn: "span 1" }}
                        >
                            {customers.map((cstmr) => (
                                <MenuItem key={cstmr._id} value={cstmr._id} >
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
                            select
                            fullWidth
                            type="text"
                            variant='filled'
                            label="Payment Type"
                            value={paymentType}
                            onChange={e => setPaymentType(e.target.value)}
                            name="paymentType"
                            id="paymentType"
                            inputProps={{ min: 0 }}
                            sx={{ gridColumn: "span 1" }}
                        >
                            {paymentTypes.map((pmtType) => (
                                <MenuItem key={pmtType.value} value={pmtType.value}>
                                    {pmtType.label}
                                </MenuItem>
                            ))}
                        </TextField>
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
                            id=""
                            sx={{ gridColumn: "span 1" }}
                        >
                            {woStatusOptions.map((sts) => (
                                <MenuItem key={sts.value} value={sts.value}>
                                    {sts.label}
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
                            sx={{ gridColumn: "2/3" }}
                        />
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
                    <Divider variant="middle" sx={{pt: '10px', boxShadow: '5px'}} />
                    <div className="flex justify-end mr-32 pt-3 pb-5">
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

