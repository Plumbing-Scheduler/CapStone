import React, { useEffect, useState } from 'react'
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme.js";
import Header from '../../components/Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const ServiceReports = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Reports" subtitle="" />
            </Box>
            <Box m={3}>
                <Paper >
                    <TableContainer component={Paper} sx={{ background: colors.primary[400] }} >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Customer Name</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Email</TableCell>
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
                                        <TableCell align="right">{}</TableCell>
                                        <TableCell align="right">{}</TableCell>
                                        <TableCell align="right">{}</TableCell>
                                        <TableCell align="right">{}</TableCell>
                                    </TableRow>
                                
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </Box>
    )
}

export default ServiceReports