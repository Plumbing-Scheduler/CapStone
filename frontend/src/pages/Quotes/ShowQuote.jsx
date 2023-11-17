import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { Box, Typography, Paper, Divider, IconButton } from '@mui/material';
import Header from '../../components/Header';
import useMediaQuery from '@mui/material/useMediaQuery';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ShowQuote = () => {
  const { id } = useParams();
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(true);

  const minwidth2 = useMediaQuery('(min-width:500px)');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3500/quote/${id}`)
      .then((response) => {
        setQuote(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

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
        <Box>
          <Paper elevation={3} sx={{ p: 3, mt: 3, maxWidth: '100%' }}>
          <Typography variant="h2" sx={{ fontSize: '2.5rem', paddingBottom: '10px' }}>
              Customer Information
            </Typography>
            <Divider />
            <Box mt={2}>
              {quote.firstName && (
                <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
                  <strong>Name:</strong> {quote.firstName} {quote.lastName}
                </Typography>
              )}
              {quote.phone && (
                <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
                  <strong>Phone:</strong> {quote.phone}
                </Typography>
              )}
              {quote.email && (
                <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
                  <strong>Email:</strong> {quote.email}
                </Typography>
              )}
              {quote.address && (
                <>
                  {quote.address.street && (
                    <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
                      <strong>Address:</strong> {`${quote.address.street}, ${quote.address.postalCode} ${quote.address.city}, ${quote.address.province}`}
                    </Typography>
                  )}
                </>
              )}
              {quote.busName && (
                <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
                  <strong>Business Name:</strong> {quote.busName}
                </Typography>
              )}
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mt: 3, maxWidth: '100%' }}>
          <Typography variant="h2" sx={{ fontSize: '2.5rem', paddingBottom: '10px' }}>
              Quote Information
            </Typography>
            <Divider />
            <Box mt={2}>
              {quote.description && (
                <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
                  <strong>Quote Description:</strong> {quote.description}
                </Typography>
              )}
              {quote.cost && (
                <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
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
