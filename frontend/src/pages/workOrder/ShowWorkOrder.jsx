import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Divider, IconButton, Grid } from '@mui/material';
import Header from '../../components/Header';
import Spinner from 'react-bootstrap/esm/Spinner';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DeleteButton } from '../../components/global/DeleteButton';
import { EditButton } from '../../components/global/EditButton';

const ShowWorkOrder = () => {
  const { id } = useParams();
  const [workOrder, setWorkOrder] = useState({});
  const [loading, setLoading] = useState(true);
  dayjs.extend(localizedFormat);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3500/workorders/${id}`)
      .then((response) => {
        setWorkOrder(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <Box>
      <Header title={"WORK ORDER"} subtitle={"DETAILS"} />

      <Box display="flex" justifyContent="flex-end" mt={3} spaceX={3}>
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
              <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                <Typography variant="h2" sx={{ fontSize: '2.5rem', paddingBottom: '10px' }}>
                  Work Order Information
                </Typography>
                <Divider sx={{ marginBottom: '10px' }} />
                <Typography variant="body1" sx={{ fontSize: '1.8rem' }}>
                  {workOrder.title}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
                  <b>Description:</b> {workOrder.description}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
                  <b>Location:</b> {workOrder.address}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
                  <b>Cost:</b> ${workOrder.cost}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
                  <b>Start Date/Time:</b> {dayjs(workOrder.startDate).format('LLL')}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
                  <b>End Date/Time:</b> {dayjs(workOrder.endDate).format('LLL')}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                <Typography variant="h2" sx={{ fontSize: '2.5rem', paddingBottom: '10px' }}>
                  Assigned Employee Information
                </Typography>
                <Divider sx={{ marginBottom: '10px' }} />
                <Typography variant="body1" sx={{ fontSize: '1.8rem' }}>
                  {workOrder.assignedEmp}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                <Typography variant="h2" sx={{ fontSize: '2.5rem', paddingBottom: '10px' }}>
                  Customer Information
                </Typography>
                <Divider sx={{ marginBottom: '10px' }} />
                <Typography variant="body1" sx={{ fontSize: '1.8rem' }}>
                  {workOrder.customerID}
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
