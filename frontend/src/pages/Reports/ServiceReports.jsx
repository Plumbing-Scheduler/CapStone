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


const ServiceReports = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { filter } = useParams();
    const filterObj = JSON.parse(filter);
    

    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [workOrders, setWorkOrders] = useState([]);

    useEffect(() => {
        axiosInstance.get('/employees')
            .then((responce) => {
                setEmployees(responce.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

            axiosInstance.get('/customer')
            .then((responce) => {
                setCustomers(responce.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

            axiosInstance.get('/workorders')
            .then((responce) => {
                setWorkOrders(responce.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
            console.log(filterObj);
    }, []);
    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Reports" subtitle="" />
            </Box>
            <Box m={3}>
                <Box mb={2}>
                    <Paper elevation={3} sx={{ backgroundColor: colors.primary[400], p: 2 }}>
                        <Typography variant="h6" ><b>Customer ID: </b></Typography>
                        <Typography variant="h6" ><b>CustomerName: </b></Typography>
                        <Typography variant="h6" ><b>Phone Number: </b></Typography>
                        <Typography variant="h6" ><b>Address: </b></Typography>
                        <Typography variant="h6" ><b>Email: </b></Typography>
                    </Paper>
                </Box>
                <TableContainer component={Paper} sx={{ background: colors.primary[400] }} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Service Type</TableCell>
                                <TableCell>Commercial/Residential</TableCell>
                                <TableCell>Employee</TableCell>
                                <TableCell>Completion Date</TableCell>
                                <TableCell>Payment Type</TableCell>
                                <TableCell>Cost</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {rows.map((row) => ())} */}
                            <TableRow
                            // key={row.name}
                            // sx = {{ '&: last-child td, &: last-child th' : {border:0}}}
                            >
                                {/* <TableCell component="th" scope="row"></TableCell> */}
                                <TableCell >
                                    {/* {row.name} */}
                                </TableCell>
                                <TableCell align="right">{ }</TableCell>
                                <TableCell align="right">{ }</TableCell>
                                <TableCell align="right">{ }</TableCell>
                                <TableCell align="right">{ }</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
        </Box>
    )
}

export default ServiceReports