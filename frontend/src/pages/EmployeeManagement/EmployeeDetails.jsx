import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import dayjs from 'dayjs';
import { Box, Typography, Paper, Divider, Grid, IconButton, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { tokens } from "../../theme";
import { DeleteButton } from '../../components/global/DeleteButton';
import { EditButton } from '../../components/global/EditButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const EmployeeDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3500/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <Box>
      <Header title={'EMPLOYEE'} subtitle={'DETAILS'} />

      <Box display="flex" justifyContent="flex-end" mt={3}>
        <EditButton />
        <DeleteButton />
      </Box>

      {loading ? (
        <div className="w-5 m-auto h-5 pt-11 text-center">
          <Spinner />
        </div>
      ) : (
        <Box m={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Paper elevation={3} sx={{ p: 3, mt: 3, backgroundColor: colors.primary[400]}}>
                <Typography variant="h3" sx={{ paddingBottom: '1rem' }}>
                  Employee Information
                </Typography>
                <Divider />
                <Box mt={2}>
                  {employee.firstName && (
                    <Typography variant="h5">
                      <strong>Name:</strong> {employee.firstName} {employee.lastName}
                    </Typography>
                  )}
                  {employee.phone && (
                    <Typography variant="h5">
                      <strong>Phone:</strong> {employee.phone}
                    </Typography>
                  )}
                  {employee.email && (
                    <Typography variant="h5">
                      <strong>Email:</strong> {employee.email}
                    </Typography>
                  )}
                  {employee.address && (
                    <>
                      {employee.address.street && (
                        <Typography variant="h5">
                          <strong>Address:</strong> {`${employee.address.street}, ${employee.address.city}, ${employee.address.province}`}
                        </Typography>
                      )}
                      {employee.address.postalCode && (
                        <Typography variant="h5">
                          <strong>Postal Code:</strong> {employee.address.postalCode}
                        </Typography>
                      )}
                      {employee.startDate && (
                        <Typography variant="h5">
                          <strong>Start Date:</strong> {dayjs(employee.startDate).toISOString().substring(0, 10)}
                        </Typography>
                      )}
                    </>
                  )}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Paper elevation={3} sx={{ p: 3, mt: 3, backgroundColor: colors.primary[400] }}>
                <Typography variant="h3" sx={{ paddingBottom: '1rem' }}>
                  Availability/Hours
                </Typography>
                <Divider />
                <Box mt={2}>
                  {employee.employmentType && (
                    <Typography variant="h5">
                      <strong>Employment Type:</strong> {employee.employmentType}
                    </Typography>
                  )}
                  {employee.status && (
                    <Typography variant="h5">
                      <strong>Status:</strong> {employee.status}
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Paper elevation={3} sx={{ p: 3, mt: 3, backgroundColor: colors.primary[400] }}>
                <Typography variant="h3" sx={{ paddingBottom: '1rem' }}>
                  Education/Experience
                </Typography>
                <Divider />
                <Box mt={2}>
                  {employee.role && (
                    <Typography variant="h5">
                      <strong>Role:</strong> {employee.role}
                    </Typography>
                  )}
                  {employee.experience && (
                    <Typography variant="h5">
                      <strong>Years of Experience:</strong> {employee.experience}
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default EmployeeDetails;
