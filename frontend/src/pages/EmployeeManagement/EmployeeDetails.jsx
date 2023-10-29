import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import dayjs from 'dayjs';
import Header from '../../components/Header';
import { DeleteButton } from '../../components/global/DeleteButton';
import { EditButton } from '../../components/global/EditButton';

const EmployeeDetails = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3500/employees/${id}`)
            .then((responce) => {
                setEmployee(responce.data);
                setLoading(false);
                console.log(employee.startDate);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, [])

    return (
        <Box>
            <div class="flex">
                <Header title={"EMPLOYEE"} subtitle={"DETAILS"} class="flex"/>
                <EditButton></EditButton>
                <DeleteButton></DeleteButton>
            </div>
            {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (

                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns={"repeat(2, minmax(0, 1fr))"}
                    sx={{
                        gridColumn: "span 4",
                        margin: "auto",
                        width: '75%',
                    }}
                >
                    <Box>
                        <Typography
                            variant="h2"
                            sx={{
                                width: '75%',
                                paddingBottom: '10px'
                            }}>
                            Employee Information
                        </Typography>
                        <Box>
                            <Typography variant='body1'>{employee.firstName} {employee.lastName}</Typography>
                            <Typography variant='body1'>{employee.phone}</Typography>
                            <Typography variant='body1'>{employee.email}</Typography>
                            <Typography variant='body1'>{employee.address.street}, {employee.address.city}, {employee.address.province}</Typography>
                            <Typography variant='body1'>{employee.address.postalCode}</Typography>
                            <Typography variant='body1'>Start Date: {dayjs(employee.address.startDate).toISOString().substring(0, 10)}</Typography>
                        </Box>
                    </Box>
                    
                    <Box>
                        <Typography
                            variant="h2"
                            sx={{
                                width: '75%',
                                paddingBottom: '10px'
                            }}>
                            Availability/Hours
                        </Typography>
                        <Typography variant='body1'>{employee.employmentType}</Typography>
                        <Typography variant='body1'>{employee.status}</Typography>
                    </Box>
                    
            
                
                    <Box>
                        <Typography
                            variant="h2"
                            sx={{
                                width: '75%',
                                paddingBottom: '10px'
                            }}>
                            Eduation/Experience
                        </Typography>
                        <Typography variant='body1'>{employee.role}</Typography>
                        <Typography variant='body1'>Years of Experience: {employee.experience} </Typography>
                    </Box>
                </Box>
            )}
        </Box>
        
        
    )
}


export default EmployeeDetails