import React from 'react';
import { Link } from 'react-router-dom';
import { Box, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";

export const ScheduleQuote = ({ state=''}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Link to={"/workorder/form"} className='link' state={state}>
        <Box display="flex" justifyContent="space-between" backgroundColor={colors.grey[400]} borderRadius="3px" >
          <Button variant="text" sx={{color: 'white'}}>
            Schedule as Work Order
          </Button>
        </Box>
      </Link>
    </Box>
  );
}