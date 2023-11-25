import React, { useState } from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Box, IconButton, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const SideBarSmall = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <Box sx={{position: 'fixed', top:0, height: "100%", padding: ".75rem", zIndex: 50}}>
      <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
        <MenuOutlinedIcon />
      </IconButton>
      <Box>
        <Box 
          sx={isCollapsed ? 
              { width: '100%', height: "100%", transition: '.3s', backgroundColor: colors.primary[100]} : 
              { width: '0', height: "0", transition: '.3s', visibility: 'hidden' }} 
              >
                <Box sx={{width: '100%', height: '100%'}}>
                  hi
                </Box>

        </Box>
      </Box>
    </Box>
  )
}

export default SideBarSmall