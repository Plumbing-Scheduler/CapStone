import React from 'react';
import { Link } from 'react-router-dom';
import { Box, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import useMediaQuery from '@mui/material/useMediaQuery';

const AddNewButton = ({destination = '/', item = ''}) => { /*sets "destination" and "item" variables to '/' and empty string respectively as default if no props are sent in*/
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const minwidth1 = useMediaQuery('(min-width:800px)');
    const minwidth2 = useMediaQuery('(min-width:500px)');

    return (
        <div>
            <Box display="flex" justifyContent="space-between" p={3} sx={{ margin: 'auto', pt: '2%', width: minwidth1 ? 'auto' : minwidth2 ? '100%' : '100%',}}>
                <Link to={destination} relative='path' className='link'> {/* Routes button to value of "destination" */}
                    <Box display="flex" justifyContent="space-between" backgroundColor={colors.grey[400]} borderRadius="3px" >
                        <Button variant="Text">Add New {item}</Button> {/** Displays "Add New" and value of "item" as button text*/}
                    </Box>
                </Link>
            </Box>
        </div>
    )}

export default AddNewButton;