import { Box, Typography, Paper, Divider, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import axiosInstance from "../../axiosInstance.js";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Header from '../../components/Header';
import { DeleteButton } from '../../components/global/DeleteButton';
import { EditButton } from '../../components/global/EditButton';

const CustomerDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/customer/${id}`)
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
          <Paper elevation={3} sx={{ p: 3, mt: 3, backgroundColor: colors.primary[400] }} >
            <Typography variant="h3" sx={{ paddingBottom: '1rem' }}>
              Customer Information
            </Typography>
            <Divider />
            <Box mt={2}>
              {customer.firstName && (
                <Typography variant="h5" >
                  <strong>Name:</strong> {customer.firstName} {customer.lastName}
                </Typography>
              )}
              {customer.phone && (
                <Typography variant="h5" >
                  <strong>Phone:</strong> {customer.phone}
                </Typography>
              )}
              {customer.email && (
                <Typography variant="h5" >
                  <strong>Email:</strong> {customer.email}
                </Typography>
              )}
              {customer.address && (
                <>
                  {customer.address.street && (
                    <Typography variant="h5" >
                      <strong>Address:</strong> {`${customer.address.street}, ${customer.address.postalCode} ${customer.address.city}, ${customer.address.province}`}
                    </Typography>
                  )}
                </>
              )}
              {customer.busName && (
                <Typography variant="h5" >
                  <strong>Business Name:</strong> {customer.busName}
                </Typography>
              )}

            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default CustomerDetails;