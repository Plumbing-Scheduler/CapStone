import React from 'react';
import { Link } from 'react-router-dom';
import { Box, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";

export const DeleteButton = ({path=''}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Link to={path} className='link'>
        <Box display="flex" justifyContent="space-between" backgroundColor={colors.redAccent[400]} borderRadius="3px" >
          <Button variant="text">
            Delete
          </Button>
        </Box>
      </Link>
    </Box>
  );
}