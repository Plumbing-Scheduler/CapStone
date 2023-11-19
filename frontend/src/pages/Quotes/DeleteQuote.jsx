import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Alert, AlertTitle, Box, Typography, Button, useTheme } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { tokens } from "../../theme.js";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance.js';
import Spinner from 'react-bootstrap/esm/Spinner';
import useMediaQuery from '@mui/material/useMediaQuery';

const DeleteQuote = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [ serverError, setServerError ] = useState(false);
    const [ noInput, setNoInput ] = useState(false);
    const { id } = useParams();
    const [quote, setQuote] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const minwidth1 = useMediaQuery('(min-width:800px)');
    const minwidth2 = useMediaQuery('(min-width:500px)');

    useEffect(() => {
        setLoading(true);
        axiosInstance
            .get(`/quote/${id}`)
            .then((responce) => {
                setQuote(responce.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, [])

    const handleDelete = () => {
        setServerError(false);
        axiosInstance
            .delete(`/quote/${id}`)
            .then(
                navigate('/quotes')
            )
            .catch((error) => {
                console.log(error.response.status)
                if (error.response.status === 500) {
                    setServerError(true);
                }
            })
    }

    return (
        <Box >
            <Header title={"QUOTE REQUEST"} subtitle={"DELETE QUOTE REQUEST"} />
            {loading ? (
                <div className='w-5 m-auto h-5 pt-11 text-center'>
                    <Spinner />
                </div>
            ) : (
                <Box m="100px"sx={{ width: minwidth1 ? 'auto' : minwidth2 ? '80%' : '100%' }}>
                    <Box sx={{margin: 'auto', width: '60%', boxShadow: '4', border: 'solid', borderWidth: "2px", borderRadius: '5px' }}>
                    {serverError &&
                    <Alert severity="error">
                        <AlertTitle>Server Error</AlertTitle>
                            Internal Server Error. Please Try Again Later.
                    </Alert>}
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
                                This will Delete Quote Request From <b>{quote.firstName + " " + quote.lastName}</b> Forever!
                            </div>
                            <div>
                                <b>Description:</b> {quote.description}
                            </div>
                            <br />
                            Are You sure you want to Delete?
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" sx={{ width: '20%', margin: 'auto', pt: '2%' }}>
                        <Link to={'/quotes'}>
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

export default DeleteQuote