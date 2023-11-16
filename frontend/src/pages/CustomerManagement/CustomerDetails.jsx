import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import dayjs from 'dayjs';
import Header from '../../components/Header';
import { DeleteButton } from '../../components/global/DeleteButton';
import { EditButton } from '../../components/global/EditButton';

const CustomerDetails = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3500/customer/${id}`)
            .then((responce) => {
                setCustomer(responce.data);
                setLoading(false);
                console.log(customer.startDate);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, [])

    return (
        <Box>
            <Box>
                <Header title={"CUSTOMER"} subtitle={"DETAILS"} />
            </Box>
            {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (

                <div>
                    <div className='flex justify-end m-4 space-x-3'>
                        <EditButton />
                        <DeleteButton />
                    </div>
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
                                Customer Information
                            </Typography>
                            <Box>
                                <Typography variant='body1'>{customer.firstName} {customer.lastName}</Typography>
                                <Typography variant='body1'>{customer.phone}</Typography>
                                <Typography variant='body1'>{customer.email}</Typography>
                                <Typography variant='body1'>{customer.address.street}</Typography>
                                <Typography variant='body1'>{customer.address.postalCode}</Typography>
                                <Typography variant='body1'>{customer.address.city} {customer.address.province}</Typography>
                                <Typography variant='body1'>{customer.busName}</Typography>
                            </Box>
                        </Box>

                    

                   
                    </Box>
                </div>
            )}
        </Box>


    )
}


export default CustomerDetails