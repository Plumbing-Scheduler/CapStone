import React from 'react';
import { Link } from 'react-router-dom';
import { Box, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";

export const DeleteButton = ({itemid = "", path = '/'}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box>
            <Link to={`/${path}/delete/${itemid}`}  className='link'>
                <Box backgroundColor={colors.primary[400]} borderRadius="3px">
                    <Button variant="Text">Delete</Button>
                </Box>
            </Link>
        </Box>
    )
}

export default DeleteButton;