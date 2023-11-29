import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import dayjs from 'dayjs';
import { Box, Typography, Paper, Divider, Grid, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { tokens } from "../../theme";
import { DeleteButton } from '../../components/global/DeleteButton';
import { EditButton } from '../../components/global/EditButton';


const EmployeeDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
        .get(`/employees/${id}`)
        .then((response) => {
            setEmployee(response.data);
            setLoading(false);
            console.log(employee.startDate);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })
}, [])

  return (
    <Box>
      <Header title={'EMPLOYEE'} subtitle={'Details'} />

      {loading ? (
        <div className="w-5 m-auto h-5 pt-11 text-center">
          <Spinner />
        </div>
      ) : (
        <Box m={4}>
          <div className="flex justify-end space-x-3">
            <EditButton path={`../../employee/edit/${id}`}/>
            <DeleteButton path={`../../employee/delete/${id}`}/>
          </div>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <Paper elevation={3} sx={{ p: 3, mt: 3, backgroundColor: colors.primary[400]}}>
                <Typography variant="h4" sx={{ paddingBottom: '1rem' }}>
                  Employee Information
                </Typography>
                <Divider />
                <Box mt={2}>
                  {employee.firstName && (
                    <Typography variant="h6">
                      <strong>Name:</strong> {employee.firstName} {employee.lastName}
                    </Typography>
                  )}
                  {employee.phone && (
                    <Typography variant="h6">
                      <strong>Phone:</strong> {employee.phone}
                    </Typography>
                  )}
                  {employee.email && (
                    <Typography variant="h6">
                      <strong>Email:</strong> {employee.email}
                    </Typography>
                  )}
                  {employee.address && (
                    <>
                      {employee.address.street && (
                        <Typography variant="h6">
                          <strong>Address:</strong> {`${employee.address.street}, ${employee.address.city}, ${employee.address.province}`}
                        </Typography>
                      )}
                      {employee.address.postalCode && (
                        <Typography variant="h6">
                          <strong>Postal Code:</strong> {employee.address.postalCode}
                        </Typography>
                      )}
                      {employee.startDate && (
                        <Typography variant="h6">
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
                <Typography variant="h4" sx={{ paddingBottom: '1rem' }}>
                  Availability/Hours
                </Typography>
                <Divider />
                <Box mt={2}>
                  {employee.employmentType && (
                    <Typography variant="h6">
                      <strong>Employment Type:</strong> {employee.employmentType}
                    </Typography>
                  )}
                  {employee.status && (
                    <Typography variant="h6">
                      <strong>Status:</strong> {employee.status}
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Paper elevation={3} sx={{ p: 3, mt: 3, backgroundColor: colors.primary[400] }}>
                <Typography variant="h4" sx={{ paddingBottom: '1rem' }}>
                  Education/Experience
                </Typography>
                <Divider />
                <Box mt={2}>
                  {employee.role && (
                    <Typography variant="h6">
                      <strong>Role:</strong> {employee.role}
                    </Typography>
                  )}
                  {employee.experience && (
                    <Typography variant="h6">
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
