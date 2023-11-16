import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import dayjs from 'dayjs';
import Header from '../../components/Header';
import { DeleteButton } from '../../components/global/DeleteButton';
import { EditButton } from '../../components/global/EditButton';

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3500/customer/${id}`)
      .then((response) => {
        setCustomer(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <Box>
      <Header title={'CUSTOMER'} subtitle={'DETAILS'} />
      {loading ? (
        <div className="w-5 m-auto h-5 pt-11 text-center">
          <Spinner />
        </div>
      ) : (
        <Box m={4}>
          <div className="flex justify-end space-x-3">
            <EditButton />
            <DeleteButton />
          </div>
          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h4" sx={{ paddingBottom: '1rem' }}>
              Customer Information
            </Typography>
            <Divider />
            <Box mt={2}>
              <Typography variant="body1">
                <strong>Name:</strong> {customer.firstName} {customer.lastName}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {customer.phone}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {customer.email}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {`${customer.address.street}, ${customer.address.postalCode} ${customer.address.city}, ${customer.address.province}`}
              </Typography>
              <Typography variant="body1">
                <strong>Business Name:</strong> {customer.busName}
              </Typography>
              {/* Add more fields as needed */}
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default CustomerDetails;