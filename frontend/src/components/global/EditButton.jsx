import React from 'react';
import { Link } from 'react-router-dom';
import { Box, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";

export const EditButton = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
            <Box display="flex" justifyContent="flex-end" p={3}>
                <Link to='..' relative='path' className='link'>
                    <Box display="flex" justifyContent="space-between" backgroundColor={colors.primary[400]} borderRadius="3px">
                        <Button variant="Text">Edit</Button>
                    </Box>
                </Link>
            </Box>
    )
}

export default EditButton;