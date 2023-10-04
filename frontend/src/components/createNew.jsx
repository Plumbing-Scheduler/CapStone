import React from 'react';
import { Link } from 'react-router-dom';
import { Box, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";

const CreateNewButton = ({destination = '/', item = ''}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <div>
            <Box display="flex" justifyContent="space-between" p={3}>
                <Link to={destination} relative='path' className='link'>
                    <Box display="flex" justifyContent="space-between" backgroundColor={colors.primary[400]} borderRadius="3px" >
                        <Button variant="Text">Add New {item}</Button>
                    </Box>
                </Link>
            </Box>
        </div>
    )
}

export default CreateNewButton