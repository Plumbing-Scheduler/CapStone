import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { Alert, AlertTitle, Box, Typography, Paper, Divider, IconButton, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import Header from '../../components/Header';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DeleteButton } from '../../components/global/DeleteButton';
import { EditButton } from '../../components/global/EditButton';
import { ScheduleQuote } from '../../components/global/Process';
 
const ShowQuote = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [noInput, setNoInput] = useState(false);
  const minwidth2 = useMediaQuery('(min-width:500px)');
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/quote/${id}`)
      .then((response) => {
        setQuote(response.data);
        axiosInstance
          .get(`/customer/${response.data.customerId}`)
          .then((response) => {
            setCustomer(response.data); 
            console.log(response.data)
            setLoading(false);
          })
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
      <Header title="QUOTE REQUESTS" subtitle="Details" />

      <Box display="flex" justifyContent="flex-end" m={4} space={3}>
        <div className="flex justify-end space-x-3">
          <EditButton path={`../../quotes/edit/${id}`} />
          <DeleteButton path={`../../quotes/delete/${id}`} />
          <ScheduleQuote state={{quote, customer}}/>
        </div>
      </Box>

      {loading ? (
        <div className="w-5 m-auto h-5 pt-11 text-center">
          <Spinner />
        </div>
      ) : (
        <Box m={4}>
          <Paper elevation={3} sx={{ p: 3, mt: 3, maxWidth: '100%', backgroundColor: colors.primary[400] }}>
            <Typography variant="h4" sx={{ paddingBottom: '10px' }}>
              Customer Information
            </Typography>
            <Divider />
            <Box mt={2}>
              {serverError &&
                <Alert severity="error">
                  <AlertTitle>Server Error</AlertTitle>
                  Internal Server Error. Please Try Again Later.
                </Alert>}
              {customer.firstName && (
                <Typography variant="h6">
                  <strong>Name:</strong> {customer.firstName} {customer.lastName}
                </Typography>
              )}
              {customer.phone && (
                <Typography variant="h6">
                  <strong>Phone:</strong> {customer.phone}
                </Typography>
              )}
              {customer.email && (
                <Typography variant="h6">
                  <strong>Email:</strong> {customer.email}
                </Typography>
              )}
              {customer.address && (
                <>
                  {customer.address.street && (
                    <Typography variant="h6">
                      <strong>Address:</strong> {`${customer.address.street}, ${customer.address.postalCode} ${customer.address.city}, ${customer.address.province}`}
                    </Typography>
                  )}
                </>
              )}
              {customer.busName && (
                <Typography variant="h6">
                  <strong>Business Name:</strong> {customer.busName}
                </Typography>
              )}
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mt: 3, maxWidth: '100%', backgroundColor: colors.primary[400] }}>
            <Typography variant="h4" sx={{ paddingBottom: '10px' }}>
              Quote Information
            </Typography>
            <Divider />
            <Box mt={2}>
              {quote.description && (
                <Typography variant="h6">
                  <strong>Quote Description:</strong> {quote.description}
                </Typography>
              )}
              {quote.cost && (
                <Typography variant="h6">
                  <strong>Estimate Cost:</strong> ${quote.cost}
                </Typography>
              )}
              {quote.type && (
                <Typography variant="h6">
                  <strong>Service Type:</strong> {quote.type}
                </Typography>
              )}
              {quote.address && (
                <>
                  {quote.address.street && (
                    <Typography variant="h6">
                      <strong>Address:</strong> {`${quote.address.street}, ${quote.address.postalCode} ${quote.address.city}, ${quote.address.province}`}
                    </Typography>
                  )}
                </>
                )}
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default ShowQuote;
