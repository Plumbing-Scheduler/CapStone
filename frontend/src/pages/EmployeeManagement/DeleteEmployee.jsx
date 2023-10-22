import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Box, Paper, Typography, Button, useTheme } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { tokens } from "../../theme.js";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/esm/Spinner';

const DeleteEmployee = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3500/employees/${id}`)
      .then((responce) => {
        setEmployee(responce.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, [])

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3500/employees/${id}`)
      .then(
        navigate('/employee')
      )
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <Box >
      <Header title={"EMPLOYEE"} subtitle={"DELETE EMPLOYEE"} />
      {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
        <Paper elevation={100} sx={{ width: "30%", margin: '0 auto', border: '1px solid', bgcolor: colors.buttonBase, color: 'black' }}>
          <Typography
            variant='h2'
            textAlign={'center'}
          >
            <DeleteForeverIcon sx={{ height: '100px', width: '100px', color: "red" }} />
            Delete Forever?
          </Typography>
          <Typography
            variant='h4'
            textAlign={'center'}
            m={'10px 0'}
          >
            <div>
              This will Delete <b>{employee.firstName + ' ' + employee.lastName}</b> Forever!
            </div>
            <br />
            Are You sure you want to Delete?
          </Typography>
          <Box display="flex" justifyContent="space-evenly" m={'10px 0'}>
            <Link to={'/employee'}>
              <Button sx={{
                backgroundColor: colors.greenButton,
                fontWeight: 'bold', fontSize: '13px',
                color: 'black'
              }}
              >
                No, Go Back
              </Button>
            </Link>
            <Button sx={{
              backgroundColor: colors.redButton,
              fontWeight: 'bold',
              fontSize: '13px',
              color: 'black'
            }}
              onClick={handleDelete}
            >
              Yes, Im Sure!
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  )
}

export default DeleteEmployee