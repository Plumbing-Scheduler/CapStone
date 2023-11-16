import { Box, Typography } from '@mui/material'
import axiosInstance from "../../axiosInstance";
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header';
import Spinner from 'react-bootstrap/esm/Spinner';
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { DeleteButton } from '../../components/global/DeleteButton';
import { EditButton } from '../../components/global/EditButton';

const ShowWorkOrder = () => {
  const { id } = useParams();
  const [workOrder, setWorkOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const minwidth2 = useMediaQuery('(min-width:500px)');
  dayjs.extend(localizedFormat)

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`http://localhost:3500/workorders/${id}`)
      .then((response) => {
        setWorkOrder(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, [])


  return (
    <Box>
      <div className='flex justify-between w-full'>
        <Header title={"WORK ORDER"} subtitle={"DETAILS"} />
      </div>
      {loading ? (
        <div className='w-5 m-auto h-5 pt-11 text-center'>
          <Spinner />
        </div>
      ) : (
        <div>
          <div className='flex justify-end m-4 space-x-3'>
            <EditButton />
            <DeleteButton />
          </div>
          <Box>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns={minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
              sx={{
                gridColumn: "span 2",
                margin: "auto",
                width: '80%',
              }}
            >
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    width: '75%',
                    paddingBottom: '10px'
                  }}
                >
                  Work Order Info.
                </Typography>
                <Typography variant='body1'>{workOrder.title}</Typography>
                <Typography variant='body1'>Description: <b>{workOrder.description}</b></Typography>
                <Typography variant='body1'>Location: <b>{workOrder.address}</b></Typography>
                <Typography variant='body1'>Cost: <b>${workOrder.cost}</b></Typography>
                <Typography variant='body1'>Start Date/Time: <b>{dayjs(workOrder.startDate).format('LLL')}</b></Typography>
                <Typography variant='body1'>End Date/Time: <b>{dayjs(workOrder.endDate).format('LLL')}</b></Typography>
              </Box>
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    width: '75%',
                    paddingBottom: '10px'
                  }}
                >
                  Assigned Employee Info.
                </Typography>
                <Typography variant='body1'>{workOrder.assignedEmp}</Typography>
                {/* Need to get assigned emp info and Display it here */}
              </Box>
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    width: '75%',
                    paddingBottom: '10px'
                  }}
                >
                  Customer Info.
                </Typography>
                <Typography variant='body1'>{workOrder.customerID}</Typography>
                {/* Need to get Customer info and Display it here */}
              </Box>
            </Box>
          </Box>
        </div>
      )}
    </Box>
  )
}

export default ShowWorkOrder