import React from 'react';
import { Link } from 'react-router-dom';
import { Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteButton = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Link to='..' relative='path' className='link'>
        <IconButton aria-label="delete" color="error" edge="start" sx={{ borderRadius: '50%' }}>
          <DeleteIcon />
        </IconButton>
      </Link>
    </Box>
  );
}

export default DeleteButton;