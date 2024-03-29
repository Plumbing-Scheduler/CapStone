import React from 'react';
import { Link } from 'react-router-dom';
import { Box, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";

const BackButton = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <div>
            <Box display="" justifyContent="flex" >
                <Link to='..' relative='path' className='link'> {/**Routes Up one "route" level. Eg, if path is "/workorder/form" up one route level will go to "/workorder". */}
                    <Box display="flex" justifyContent="space-between" backgroundColor={colors.primary[400]} borderRadius="3px" >
                        <Button variant="Text">Back</Button>
                    </Box>
                </Link>
            </Box>
        </div>
    )
}

export default BackButton;