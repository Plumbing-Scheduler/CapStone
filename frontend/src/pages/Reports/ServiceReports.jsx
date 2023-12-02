import React, { useEffect, useState } from 'react'
import { Box, useTheme, Typography, Button, Backdrop, TextField } from "@mui/material";
import { tokens } from "../../theme.js";
import Header from '../../components/Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Spinner from 'react-bootstrap/esm/Spinner';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

const ServiceReports = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { filter } = useParams();
    const filterObj = JSON.parse(filter);
    const [filterWO, setFilterWO] = useState([{}]);
    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [workOrders, setWorkOrders] = useState([]);
    const [open, setOpen] = useState(false);
    dayjs.extend(localizedFormat);
    dayjs.extend(isBetween)
    dayjs.extend(isSameOrAfter)
    const [repname, setRepName] = useState("");
    const [description, setDescription] = useState("");
    const date = Date.now();

    const filtering = (wo) => {
        if (filterObj.assignedEmp !== "") {
            if (wo.assignedEmp !== filterObj.assignedEmp) {
                return false
            }
        }
        if (filterObj.serviceType !== "") {
            if (wo.title !== filterObj.serviceType) {
                return false
            }
        }
        if (filterObj.paymentType !== "") {
            if (wo.paymentType !== filterObj.paymentType) {
                return false
            }
        }
        if (filterObj.serviceStatus !== "") {
            if (wo.serviceStatus !== filterObj.serviceStatus) {
                return false
            }
        }
        if (filterObj.customer !== "") {
            if (wo.customerID !== filterObj.customer) {
                return false
            }
        }
        if (filterObj.busName !== "") {
            if (wo.busName !== filterObj.busName) {
                return false
            }
        }
        if (!dayjs(wo.startDate).isBetween(dayjs(filterObj.startDate), dayjs(filterObj.endDate), 'day', '[]')) {
            return false
        }
        if (!dayjs(wo.startDate).isSameOrAfter(dayjs(filterObj.startDate), 'day')) {
            return false
        }
        return true
    }

    useEffect(() => {
        axiosInstance.get('/workorders')
            .then((responce) => {
                setWorkOrders(responce.data.data);
            }).then(() => {
                axiosInstance.get('/employees')
                    .then((responce) => {
                        setEmployees(responce.data.data);
                    })
            }).then(() => {
                axiosInstance.get('/customer')
                    .then((responce) => {
                        setCustomers(responce.data.data);
                    })
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    useEffect(() => {
        setFilterWO(workOrders.filter(filtering));
    }, [workOrders])

    const getEmployeeName = (empId) => {
        for (let i = 0; employees.length > i; i++) {
            if (employees[i]._id === empId) {
                return employees[i].firstName + ' ' + employees[i].lastName
            }
        }
        return "N/A"
    }

    const getEmployee = (custId) => {
        for (let i = 0; employees.length > i; i++) {
            if (employees[i]._id === custId) {
                return employees[i]
            }
        }
    }

    const getCustomer = (custId) => {
        for (let i = 0; customers.length > i; i++) {
            if (customers[i]._id === custId) {
                return customers[i]
            }
        }
    }

    const getCustomerFullName = (custId) => {
        for (let i = 0; customers.length > i; i++) {
            if (customers[i]._id === custId) {
                return customers[i].firstName + ' ' + customers[i].lastName
            }
        }
        return "N/A"
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const saveReport = () => {
        const report = {
            name: repname,
            description,
            date,
            params: {
                startDate: filterObj.startDate,
                endDate: filterObj.endDate,
                busName: filterObj.busName,
                customer: filterObj.customerID,
                paymentType: filterObj.paymentType,
                status: filterObj.serviceStatus,
                service: filterObj.serviceType,
                employee: filterObj.assignedEmp
            },
            info: filterWO.map((elem) => ({
                workOrder: {
                    title: elem.title,
                    startDate: elem.startDate,
                    endDate: elem.endDate,
                    description: elem.description,
                    cost: elem.cost,
                    busName: elem.busName,
                    address: elem.address.street + ", " + elem.address.postalCode,
                    paymentType: elem.paymentType
                },
                employee: {
                    name: getEmployeeName(elem.assignedEmp)
                },
                customer: {
                    name: getCustomerFullName(elem.customerID),
                    phone: getCustomer(elem.customerID).phone,
                    email: getCustomer(elem.customerID).email,
                }
            }))
        }

        saveto(report)
        setOpen(false);
    }

    const saveto = (report) => {
        axiosInstance
            .post('/report', report)
            .then((response) => {
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <Box pb={"50px"}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Reports" subtitle="" />
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box m="20px">
                    <Typography variant="h4" ><b>Search Parameters</b></Typography>

                    <Typography variant="h6" ><b>Between: </b>{dayjs(filterObj.startDate).format('LL')} - {dayjs(filterObj.endDate).format('LL')} </Typography>
                    {filterObj.busName !== "" &&
                        <Typography variant="h6" ><b>Business Name: </b>{filterObj.busName}</Typography>
                    }
                    {filterObj.customer !== "" &&
                        <Typography variant="h6" ><b>Customer: </b>{getCustomerFullName(filterObj.customer)}</Typography>
                    }
                    {filterObj.paymentType !== "" &&
                        <Typography variant="h6" ><b>Payment Type: </b>{filterObj.paymentType}</Typography>
                    }
                    {filterObj.serviceStatus !== "" &&
                        <Typography variant="h6" ><b>Work Order Status: </b>{filterObj.serviceStatus}</Typography>
                    }
                    {filterObj.serviceType !== "" &&
                        <Typography variant="h6" ><b>Service Type: </b>{filterObj.serviceType}</Typography>
                    }
                    {filterObj.assignedEmp !== "" &&
                        <Typography variant="h6" ><b>Employee: </b>{getEmployeeName(filterObj.assignedEmp)}</Typography>
                    }
                </Box>
                <Box sx={{ width: "auto", margin: "20px", backgroundColor: colors.buttonBase, color: 'white', borderRadius: '3px', }}>
                    <Button
                        sx={{ margin: "auto", backgroundColor: colors.buttonBase, color: 'white', borderRadius: '3px', }}
                        onClick={handleOpen}
                    >
                        Save Report
                    </Button>
                </Box>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <Paper sx={{ height: "auto", width: 'auto' }}>
                    <Box sx={{ width: 'auto', margin: 'auto' }}>
                        <Box m={"20px"}>
                            <Typography>Enter a Report Name</Typography>
                            <TextField
                                variant='filled'
                                size='small'
                                sx={{ width: '100%' }}
                                value={repname}
                                onChange={(e) => setRepName(e.target.value)}
                            />
                        </Box>
                        <Box m={"20px"}>
                            <Typography>Enter a Description of The Report (Optional)</Typography>
                            <TextField
                                variant='filled'
                                size='small'
                                sx={{ width: '100%' }}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Box>
                        <Box m="20px">
                            <Typography variant="h5" ><b>Search Parameters</b></Typography>

                            <Typography variant="h6" ><b>Between: </b>{dayjs(filterObj.startDate).format('L')} - {dayjs(filterObj.endDate).format('L')} </Typography>
                            {filterObj.busName !== "" &&
                                <Typography variant="h6" ><b>Business Name: </b>{filterObj.busName}</Typography>
                            }
                            {filterObj.customer !== "" &&
                                <Typography variant="h6" ><b>Customer: </b>{getCustomerFullName(filterObj.customer)}</Typography>
                            }
                            {filterObj.paymentType !== "" &&
                                <Typography variant="h6" ><b>Payment Type: </b>{filterObj.paymentType}</Typography>
                            }
                            {filterObj.serviceStatus !== "" &&
                                <Typography variant="h6" ><b>Work Order Status: </b>{filterObj.serviceStatus}</Typography>
                            }
                            {filterObj.serviceType !== "" &&
                                <Typography variant="h6" ><b>Service Type: </b>{filterObj.serviceType}</Typography>
                            }
                            {filterObj.assignedEmp !== "" &&
                                <Typography variant="h6" ><b>Employee: </b>{getEmployeeName(filterObj.assignedEmp)}</Typography>
                            }
                        </Box>

                        <Box display="flex" justifyContent="space-evenly" alignItems="center" margin={'auto 0 30px 0'}>
                            <Box sx={{ width: "auto", margin: "20px", backgroundColor: colors.buttonBase, color: 'white', borderRadius: '3px', textAlign: 'center' }}>
                                <Button
                                    sx={{ margin: "auto", backgroundColor: colors.buttonBase, color: 'white', borderRadius: '3px', }}
                                    onClick={saveReport}
                                >
                                    Submit
                                </Button>
                            </Box>
                            <Box sx={{ width: "auto", margin: "20px", backgroundColor: colors.buttonBase, color: 'white', borderRadius: '3px', textAlign: 'center' }}>
                                <Button
                                    sx={{ margin: "auto", backgroundColor: colors.buttonBase, color: 'white', borderRadius: '3px', }}
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Paper>

            </Backdrop>
            {filterWO.length === 0 &&
                <Box ml="20px" sx={{ width: "206px", margin: "40px auto" }}>
                    <Typography variant="h3" ><b>No Results Found </b></Typography>
                </Box>
            }

            {filterWO.map((wo) => (
                <Box m={3} mb={6}>

                    {!getCustomer(wo.customerID) ? (
                        <div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>
                    ) : (
                        <div>
                            <Box mb={1}>
                                <Paper elevation={3} sx={{ backgroundColor: colors.primary[400], p: 2 }}>
                                    {/**Bug here, when page is rendered exception is thrown because technically "filterWO" is undefined*/}
                                    <Typography variant="h6" ><b>Customer ID: </b>{wo.customerID}</Typography>
                                    <Typography variant="h6" ><b>CustomerName: </b>{getCustomer(wo.customerID).firstName + ' ' + getCustomer(wo.customerID).lastName}</Typography>
                                    <Typography variant="h6" ><b>Phone Number: </b>{getCustomer(wo.customerID).phone}</Typography>
                                    <Typography variant="h6" ><b>Address: </b>{getCustomer(wo.customerID).address.street}</Typography>
                                    <Typography variant="h6" ><b>Email: </b>{getCustomer(wo.customerID).email}</Typography>
                                </Paper>
                            </Box>

                            <TableContainer component={Paper} sx={{ background: colors.primary[400] }} >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Service Type</b></TableCell>
                                            <TableCell><b>Employee</b></TableCell>
                                            <TableCell><b>Completion Date</b></TableCell>
                                            <TableCell><b>Payment Type</b></TableCell>
                                            <TableCell><b>Cost</b></TableCell>
                                            <TableCell><b>Status</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="left">{wo.title}</TableCell>
                                            <TableCell align="left">{getEmployeeName(wo.assignedEmp)}</TableCell>
                                            <TableCell align="left">{dayjs(wo.endDate).format("ll")}</TableCell>
                                            <TableCell align="left">{wo.paymentType}</TableCell>
                                            <TableCell align="left">${wo.cost}</TableCell>
                                            <TableCell align="left">{wo.serviceStatus}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )}
                </Box>
            ))}
        </Box>
    )
}

export default ServiceReports