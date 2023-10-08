import React, { useEffect, useState } from 'react';
import { Box, Button, useTheme, Typography } from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tokens } from "../../theme";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

export const DeleteWorkOrder = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const navigate = useNavigate();
  const [workOrder, setWorkOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3500/workorders/${id}`)
      .then((response) => {
        setWorkOrder(response.data)
        setLoading(false);
        console.log(workOrder);
      }
      )
      .catch((error) => {
        setLoading(false);
        console.log(error)
      });
  }, []);

  const handleDeleteWorkOrder = () => {
    axios
      .delete(`http://localhost:3500/workorders/${id}`)
      .then(
        navigate('/workorder')
      )
      .catch((error) =>
        console.log(error)
      );
  };

  return (<div>
    {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
      <Box sx={{ margin: 'auto', width: '50%', fontFamily: theme.typography.fontFamily }}>
        <Box sx={{ border: 'solid', borderWidth: "1px", width: '70%', margin: 'auto', borderRadius: '5px', borderColor: colors.primary[200] }}>
          <Typography variant="h2" fontFamily={theme.typography.fontFamily} color={colors.grey[100]} fontWeight="bold" sx={{ mb: "1%", mt: '1%', textAlign: "center" }}>Delete Work Order?</Typography>
          <div className='text-xl pl-2 pb-4'>
            <span className='font-light'>Title: </span>
            <span className='font-bold'>{workOrder.title}</span>
          </div>
          <div className='text-xl pl-2 pb-4'>
            <span className='font-light'>Description: </span>
            <span className='font-bold'>{workOrder.s_description}</span>
          </div>
          <div className='text-xl pl-2 pb-4'>
            <span className='font-light'>Start Date: </span>
            <span className='font-bold'>{workOrder.s_startDate}</span>
          </div>
          <div className='text-xl pl-2 pb-4'>
            <span className='font-light'>End Date: </span>
            <span className='font-bold'>{workOrder.endDate}</span>
          </div>
          <div className='text-xl pl-2 pb-4'>
            <span className='font-light'>Cost: </span>
            <span className='font-bold'>${workOrder.s_cost}</span>
          </div>
          <div className='text-xl pl-2 pb-4'>
            <span className='font-light'>Address: </span>
            <span className='font-bold'>{workOrder.address}</span>
          </div>
          <div className='text-xl pl-2 pb-4'>
            <span className='font-light'>Business name: </span>
            <span className='font-bold'>{workOrder.busName}</span>
          </div>
        </Box>
        <Box display="flex" justifyContent="space-between" sx={{ width: '30%', margin: 'auto', pt: '3%' }}>
          <Box backgroundColor={colors.greenAccent[500]} borderRadius={1}>
            <Link to={'/workorder'}>
              <Button>No, Go Back</Button>
            </Link>
          </Box>
          <Box backgroundColor={colors.redAccent[500]} borderRadius={1}>
            <Button onClick={handleDeleteWorkOrder} >Yes, Im Sure</Button>
          </Box>
        </Box>
      </Box>
    )}
  </div>
  )
}

export default DeleteWorkOrder