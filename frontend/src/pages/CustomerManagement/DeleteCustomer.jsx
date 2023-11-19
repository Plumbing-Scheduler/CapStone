import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Box, Typography, Button, useTheme } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { tokens } from "../../theme.js";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/esm/Spinner';

const DeleteCustomer = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id } = useParams();
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3500/customer/${id}`)
            .then((responce) => {
                setCustomer(responce.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, [])

    const handleDelete = () => {
        axios
            .delete(`http://localhost:3500/customer/${id}`)
            .then(
                navigate('/customers')
            )
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <Box >
            <Header title={"CUSTOMERS"} subtitle={"DELETE CUSTOMER"} />
            {loading ? (
                <div className='w-5 m-auto h-5 pt-11 text-center'>
                    <Spinner />
                </div>
            ) : (
                <Box m="100px">
                    <Box sx={{ margin: 'auto', width: '60%', boxShadow: '4', border: 'solid', borderWidth: "2px", borderRadius: '5px' }}>
                        <Typography
                            variant='h2'
                            textAlign={'center'}
                            m="10px"
                            p="10px"
                        >
                            <DeleteForeverIcon sx={{ height: '50px', width: '50px', color: "red" }} />
                            Delete Forever?
                        </Typography>
                        <Typography
                            variant='h4'
                            textAlign={'center'}
                            m={'10px 0'}
                            p={'40px'}
                        >
                            <div>
                                This will Delete Customer <b>{customer.firstName + " " + customer.lastName}</b> Forever!
                            </div>
                            <br />
                            Are You sure you want to Delete?
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" sx={{ width: '20%', margin: 'auto', pt: '2%' }}>
                        <Link to={'/customers'}>
                            <Button sx={{
                                backgroundColor: colors.greenButton,
                                fontWeight: 'bold',
                                fontSize: '13px',
                            }}
                            >
                                No, Go Back
                            </Button>
                        </Link>
                        <Button sx={{
                            backgroundColor: colors.redButton,
                            fontWeight: 'bold',
                            fontSize: '13px',
                        }}
                            onClick={handleDelete}
                        >
                            Yes, Im Sure!
                        </Button>
                    </Box>
                </Box>

            )}
        </Box>
    )
}

export default DeleteCustomer