import React from 'react';
import { Link } from 'react-router-dom';
import { Box, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";

const AddNewButton = ({destination = '/', item = ''}) => { {/*sets "destination" and "item" variables to '/' and empty string respectively as default if no props are sent in*/}
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <div>
            <Box display="flex" justifyContent="space-between" p={3}>
                <Link to={destination} relative='path' className='link'> {/* Routes button to value of "destination" */}
                    <Box display="flex" justifyContent="space-between" backgroundColor={colors.primary[400]} borderRadius="3px" >
                        <Button variant="Text">Add New {item}</Button> {/** Displays "Add New" and value of "item" as button text*/}
                    </Box>
                </Link>
            </Box>
        </div>
    )
}

export default AddNewButton