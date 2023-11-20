import React, { useEffect, useState } from 'react'
import { Box, useTheme, Typography } from "@mui/material";
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

const ServiceReports = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { filter } = useParams();
    const filterObj = JSON.parse(filter);
    const [filterWO, setFilterWO] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [workOrders, setWorkOrders] = useState([]);
    dayjs.extend(localizedFormat);

    const filtering = (wo) => {
        if (wo.serviceStatus != "Completed") {
            return false
        }
        if (filterObj.assignedEmp != "") {
            if (wo.assignedEmp != filterObj.assignedEmp) {
                return false
            }
        }
        if (filterObj.serviceType != "") {
            if (wo.title != filterObj.serviceType) {
                return false
            }
        }
        if (filterObj.paymentType != "") {
            if (wo.paymentType != filterObj.paymentType) {
                return false
            }
        }
        if (filterObj.customer != "") {
            if (wo.customerID != filterObj.customer) {
                return false
            }
        }
        if (filterObj.busName != "") {
            if (wo.busName != filterObj.busName) {
                return false
            }
        }
        if (!dayjs(wo.startDate).isBetween(filterObj.startDate, filterObj.endDate)) {
            return false
        }
        return true
    }

    useEffect(() => {
        axiosInstance.get('/workorders')
            .then((responce) => {
                setWorkOrders(responce.data.data);
                axiosInstance.get('/employees')
                    .then((responce) => {
                        setEmployees(responce.data.data);
                    })
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
        console.log(filterWO[0]);
        
    }, [workOrders])

    const getEmployeeName = (empId) => {
        for (let i = 0; employees.length > i; i++) {
            if (employees[i]._id === empId) {
                return employees[i].firstName + ' ' + employees[i].lastName
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

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Reports" subtitle="" />
            </Box>
            {filterWO.map((wo) => (
                <Box m={3}>
                    <Box mb={2}>
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
                </Box>
            ))}
        </Box>
    )
}

export default ServiceReports