import React, { useState, useEffect } from 'react';
import axiosInstance from "../../axiosInstance";
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Divider, Grid, useTheme } from '@mui/material';
import Header from '../../components/Header';
import Spinner from 'react-bootstrap/esm/Spinner';
import { tokens } from "../../theme";
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { DeleteButton } from '../../components/global/DeleteButton';
import { EditButton } from '../../components/global/EditButton';

const ShowWorkOrder = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const [workOrder, setWorkOrder] = useState({});
  const [employee, setEmployee] = useState({});
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(true);
  dayjs.extend(localizedFormat);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/workorders/${id}`)
      .then((response) => {
        setWorkOrder(response.data);
        console.log(response.data.assignedEmp);
        if (response.data.assignedEmp) {
          axiosInstance
            .get(`/employees/${response.data.assignedEmp}`)
            .then((response) => {
              setEmployee(response.data);
            })
        }
        axiosInstance
          .get(`/customer/${response.data.customerID}`)
          .then((response) => {
            setCustomer(response.data);
            setLoading(false);
          })
          console.log(employee)

      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  return (
    <Box>
      <Header title={"WORK ORDERS"} subtitle={"Details"} />

      {loading ? (
        <div className="w-5 m-auto h-5 pt-11 text-center">
          <Spinner />
        </div>
      ) : (
        <Box m={4}>
          <div className="flex justify-end space-x-3">
            <EditButton path={`../../workorder/edit/${id}`} />
            <DeleteButton path={`../../workorder/delete/${id}`} />
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Paper elevation={3} sx={{ p: 3, mt: 3, backgroundColor: colors.primary[400] }}>
                <Typography variant="h4" sx={{ paddingBottom: '10px' }}>
                  Work Order Information
                </Typography>
                <Divider sx={{ marginBottom: '10px' }} />
                <Typography variant="h6">
                  {workOrder.title}
                </Typography>
                <Typography variant="h6" >
                  <b>Description:</b> {workOrder.description}
                </Typography>
                <Typography variant="h6" >
                  <b>Location:</b> {workOrder.address.street}
                </Typography>
                <Typography variant="h6" >
                  <b>Cost:</b> ${workOrder.cost}
                </Typography>
                <Typography variant="h6" >
                  <b>Start Date/Time:</b> {dayjs(workOrder.startDate).format('LLL')}
                </Typography>
                <Typography variant="h6" >
                  <b>End Date/Time:</b> {dayjs(workOrder.endDate).format('LLL')}
                </Typography>
                <Typography variant="h6" >
                  <b>Status:</b> {workOrder.serviceStatus}
                </Typography>
              </Paper>
            </Grid>
            {employee.firstName !== undefined &&
              <Grid item xs={12} sm={12}>
                <Paper elevation={3} sx={{ p: 3, mt: 3, backgroundColor: colors.primary[400] }}>
                  <Typography variant="h4" sx={{ paddingBottom: '10px' }}>
                    Assigned Employee Information
                  </Typography>
                  <Divider sx={{ marginBottom: '10px' }} />
                  <Typography variant="h6">
                    {employee.firstName + " " + employee.lastName}
                  </Typography>
                  <Typography variant="h6" >
                    <b>Phone:</b> {employee.phone}
                  </Typography>
                  <Typography variant="h6" >
                    <b>Email:</b> {employee.email}
                  </Typography>
                </Paper>
              </Grid>
            }
            <Grid item xs={12} sm={12}>
              <Paper elevation={3} sx={{ p: 3, mt: 3, backgroundColor: colors.primary[400] }}>
                <Typography variant="h4" sx={{ paddingBottom: '10px' }}>
                  Customer Information
                </Typography>
                <Divider sx={{ marginBottom: '10px' }} />
                <Typography variant="h6">
                  {customer.firstName + " " + customer.lastName}
                </Typography>
                <Typography variant="h6" >
                  <b>Phone:</b> {customer.phone}
                </Typography>
                <Typography variant="h6" >
                  <b>Email:</b> {customer.email}
                </Typography>
                <Typography variant="h6" >
                  <b>Address:</b> {customer.address.street + ", " + customer.address.city + ", " + customer.address.province}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ShowWorkOrder;
