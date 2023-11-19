import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { Alert, AlertTitle, Box, Typography, Paper, Divider, IconButton, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import Header from '../../components/Header';
import useMediaQuery from '@mui/material/useMediaQuery';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ShowQuote = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(true);
  const [ serverError, setServerError ] = useState(false);
  const [ noInput, setNoInput ] = useState(false);
  const minwidth2 = useMediaQuery('(min-width:500px)');

  useEffect(() => {
    setLoading(true);
    axiosInstance
        .get(`/quote/${id}`)
        .then((response) => {
            setQuote(response.data);
            setLoading(false);
            console.log(quote.firstName);
        })
        .catch((error) => {
            setServerError(false);
            console.log(error.response.status)
            if (error.response.status === 500) {
                setServerError(true);
            }
        })
}, [])

  return (
    <Box>
      <Header title="QUOTE REQUEST" subtitle="DETAILS" />

      <Box display="flex" justifyContent="flex-end" m={4} spaceX={3}>
        <IconButton aria-label="edit" color="primary">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" color="error">
          <DeleteIcon />
        </IconButton>
      </Box>

      {loading ? (
        <div className="w-5 m-auto h-5 pt-11 text-center">
          <Spinner />
        </div>
      ) : (
        <Box m={4}>
          <Paper elevation={3} sx={{ p: 3, mt: 3, maxWidth: '100%', backgroundColor: colors.primary[400]}}>
          <Typography variant="h3" sx={{ paddingBottom: '10px' }}>
              Customer Information
            </Typography>
            <Divider />
            <Box mt={2}>
            {serverError &&
                            <Alert severity="error">
                                <AlertTitle>Server Error</AlertTitle>
                                    Internal Server Error. Please Try Again Later.
                            </Alert>}
              {quote.firstName && (
                <Typography variant="h5">
                  <strong>Name:</strong> {quote.firstName} {quote.lastName}
                </Typography>
              )}
              {quote.phone && (
                <Typography variant="h5">
                  <strong>Phone:</strong> {quote.phone}
                </Typography>
              )}
              {quote.email && (
                <Typography variant="h5">
                  <strong>Email:</strong> {quote.email}
                </Typography>
              )}
              {quote.address && (
                <>
                  {quote.address.street && (
                    <Typography variant="h5">
                      <strong>Address:</strong> {`${quote.address.street}, ${quote.address.postalCode} ${quote.address.city}, ${quote.address.province}`}
                    </Typography>
                  )}
                </>
              )}
              {quote.busName && (
                <Typography variant="h5">
                  <strong>Business Name:</strong> {quote.busName}
                </Typography>
              )}
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mt: 3, maxWidth: '100%', backgroundColor: colors.primary[400]}}>
          <Typography variant="h3" sx={{ paddingBottom: '10px' }}>
              Quote Information
            </Typography>
            <Divider />
            <Box mt={2}>
              {quote.description && (
                <Typography variant="h5">
                  <strong>Quote Description:</strong> {quote.description}
                </Typography>
              )}
              {quote.cost && (
                <Typography variant="h5">
                  <strong>Estimate Cost:</strong> ${quote.cost}
                </Typography>
              )}
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default ShowQuote;
