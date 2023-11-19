import React from 'react';
import { Link } from 'react-router-dom';
import { Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import EditIcon from '@mui/icons-material/Edit';

export const EditButton = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box>
            <Link to='..' relative='path' className='link'>
                <IconButton aria-label="edit" color="primary" edge="start" sx={{ borderRadius: '50%' }}>
                    <EditIcon />
                </IconButton>
            </Link>
        </Box>
    )
}

export default EditButton;