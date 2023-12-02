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
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Spinner from 'react-bootstrap/Spinner';

const ReportDetailsSaved = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id } = useParams();
    const [report, setReport] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    dayjs(localizedFormat);

    useEffect(() => {
        axiosInstance
            .get(`/report/${id}`)
            .then((response) => {
                setReport(response.data);
                setLoading(false);
                
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, [])

    const handleDelete = () =>{ 
        axiosInstance
            .delete(`/report/${id}`)
            .then(() => {
                navigate('/reports/saved')
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <Box pb={"50px"}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Reports Details" subtitle="" />

            </Box>
            <Box m={3}>

                {loading ? (
                    <div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>
                ) : (
                    <div>
                        <div className='flex justify-between'>
                            <Box m={3} >
                                <Paper elevation={3} sx={{ backgroundColor: colors.primary[900], p: 2, width: "auto" }}>
                                    {/**Bug here, when page is rendered exception is thrown because technically "filterWO" is undefined*/}
                                    <Typography variant="h6" ><b>Name: </b>{report.name}</Typography>
                                    <Typography variant="h6" ><b>Description: </b>{report.description}</Typography>
                                    <Typography variant="h6" ><b>Date: </b>{dayjs(report.date).format("LLL")}</Typography>
                                </Paper>
                            </Box>
                            <Box sx={{ width: "auto", margin: "auto 50px 0", backgroundColor: colors.buttonBase, color: 'white', borderRadius: '3px', }}>
                                <Button
                                    sx={{ margin: "auto", backgroundColor: colors.redAccent[500], color: 'white', borderRadius: '3px', }}
                                    onClick={handleDelete}
                                >
                                    Delete Saved Report
                                </Button>
                            </Box>
                        </div>
                        {report.info.map((elem) => (
                            <Box m={3} mb={6} key={elem._id}>
                                <Box mb={1}>
                                    <Paper elevation={3} sx={{ backgroundColor: colors.primary[400], p: 2 }}>
                                        {/**Bug here, when page is rendered exception is thrown because technically "filterWO" is undefined*/}
                                        <Typography variant="h6" ><b>CustomerName: </b>{elem.customer.name}</Typography>
                                        <Typography variant="h6" ><b>Phone Number: </b>{elem.customer.phone}</Typography>
                                        <Typography variant="h6" ><b>Email: </b>{elem.customer.email}</Typography>
                                        <Typography variant="h6" ><b>Address: </b>{elem.workOrder.address}</Typography>
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
                                            <TableRow key={elem._id}>
                                                <TableCell align="left">{elem.workOrder.title}</TableCell>
                                                <TableCell align="left">{elem.employee.name}</TableCell>
                                                <TableCell align="left">{dayjs(elem.workOrder.endDate).format("LL")}</TableCell>
                                                <TableCell align="left">{elem.workOrder.paymentType}</TableCell>
                                                <TableCell align="left">${elem.workOrder.cost}</TableCell>
                                                <TableCell align="left">{elem.workOrder.status}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        ))}
                    </div>)}
            </Box>
        </Box>
    )
}

export default ReportDetailsSaved