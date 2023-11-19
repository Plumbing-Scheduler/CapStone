import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/esm/Spinner';
import { Box, Typography } from '@mui/material';
import Header from '../../components/Header';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DeleteButton } from '../../components/global/DeleteButton';
import { EditButton } from '../../components/global/EditButton';

const ShowQuote = () => {
    const { id } = useParams();
    const [quote, setQuote] = useState({});
    const [loading, setLoading] = useState(true);

    const minwidth2 = useMediaQuery('(min-width:500px)');

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3500/quote/${id}`)
            .then((responce) => {
                setQuote(responce.data);
                setLoading(false);
                console.log(quote.firstName);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, [])

    return (
        <Box>
            <div className='flex justify-between w-full'>
                <Header title="QUOTE REQUEST" subtitle="DETAILS" />
            </div>
            {loading ? (
                <div className='w-5 m-auto h-5 pt-11 text-center'>
                    <Spinner />
                </div>
            ) : (

                <div>
                    <div className='flex justify-end m-4 space-x-3'>
                        <EditButton />
                        <DeleteButton />
                    </div>
                    <Box>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns={minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
                            sx={{
                                gridColumn: "span 2",
                                margin: "auto",
                                width: '80%',
                            }}
                        >
                            <Box
                                sx={{ m: '0 auto', width: "70%" }}
                            >
                                <Typography
                                    variant="h2"
                                    sx={{
                                        width: '75%',
                                        paddingBottom: '10px'
                                    }}
                                >
                                    Customer Info
                                </Typography>
                                <Typography variant='body1'>{quote.firstName + " " + quote.lastName}</Typography>
                                <Typography variant='body1'>{quote.phone}</Typography>
                                <Typography variant='body1'>{quote.email}</Typography>
                                <Typography variant='body1'>{quote.address}</Typography>
                                <Typography variant='body1'>{quote.busName}</Typography>
                            </Box>
                            <Box
                                sx={{ m: ' 0 auto', width: "70%" }}
                            >
                                <Typography
                                    variant="h2"
                                    sx={{
                                        width: '75%',
                                        paddingBottom: '10px'
                                    }}
                                >
                                    Quote Info
                                </Typography>
                                <Typography variant='body1'>{quote.description}</Typography>
                                <Typography variant='body1'>Estimate Cost: ${quote.cost}</Typography>
                            </Box>
                        </Box>

                    </Box>
                </div>
            )}
        </Box>
    )
}

export default ShowQuote