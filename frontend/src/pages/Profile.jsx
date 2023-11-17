import { Box, Typography, useTheme, TextField, Button } from '@mui/material'
import React from 'react'
import { tokens } from "../theme.js";
const Profile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box sx={{ width: "400px", margin: "0 auto" }}>
            <div className='shadow-lg m-3 p-2'>
                <Box
                    display="grid"
                    m={"20px 0"}
                    gap={"20px"}
                    sx={{ gridColumn: "span 2" }}
                    gridTemplateColumns={"repeat(1, minmax(0, 1fr))"}>
                    <Typography variant='h3'>
                        Profile
                    </Typography>
                    <Box
                        display="grid"
                        sx={{ gridColumn: "span 1" }}
                        gridTemplateColumns={"repeat(2, minmax(0, 1fr))"}
                    >
                        <Box sx={{ gridColumn: "span 1" }}>
                            <Typography variant='h5'>
                                First Name
                            </Typography>
                            <TextField
                                size="small"
                                type="text"
                                sx={{ width: '170px' }} />
                        </Box>
                        <Box sx={{ gridColumn: "span 1" }}>
                            <Typography variant='h5'>
                                Last Name
                            </Typography>
                            <TextField
                                size="small"
                                type="text"
                                sx={{ width: '170px' }} />
                        </Box>

                    </Box>
                    <Box sx={{ gridColumn: "span 1" }}>
                        <Typography variant='h5'>
                            Email
                        </Typography>
                        <TextField
                            size="small"
                            type="text"
                            sx={{ width: '100%' }} />
                    </Box>
                    <Box sx={{ gridColumn: "span 1" }}>
                        <Typography variant='h5'>
                            Phone
                        </Typography>
                        <TextField
                            size="small"
                            type="text"
                            sx={{ width: '100%' }} />
                    </Box>
                    <Box sx={{ gridColumn: "span 1" }}>
                        <Typography variant='h5'>
                            Address
                        </Typography>
                    </Box>
                </Box>
                <Box
                    display="grid"
                    m={"20px 0"}
                    gap={"20px"}
                    sx={{ gridColumn: "span 2" }}
                    gridTemplateColumns={"repeat(1, minmax(0, 1fr))"}>
                    <Typography variant='h3'>
                        Employement Info
                    </Typography>
                    <Box>
                        <Typography variant='h5'>
                            Type
                        </Typography>
                        <TextField
                            size="small"
                            type="text"
                            sx={{ width: '100%' }} />
                    </Box>
                    <Box>
                        <Typography variant='h5'>
                            Status
                        </Typography>
                        <TextField
                            size="small"
                            type="text"
                            sx={{ width: '100%' }} />
                    </Box>
                    <Box>
                        <Typography variant='h5'>
                            Start Date
                        </Typography>
                        <TextField
                            size="small"
                            type="date"
                            sx={{ width: '100%' }} />
                    </Box>
                </Box>
            </div>
            <div className='shadow-lg m-10 p-2'>
                <Typography
                    variant='h3'
                >
                    Change Password
                </Typography>

                <TextField
                    type="text"
                    variant='standard'
                    label="Old Password"
                    sx={{ height: '100%' }} />
                <TextField
                    type="text"
                    variant='standard'
                    label="New Password"
                    sx={{ height: '1%' }} />
                <TextField
                    type="text"
                    variant='standard'
                    label="Confirm New Password"
                    sx={{ height: '1%' }} />
                <Box
                    backgroundColor={colors.redButton}
                    display="grid"
                    sx={{
                        margin: "10px auto",
                        width: '200px',
                        borderRadius: "5px"
                    }}
                >
                    <Button variant="Text" >
                        Change pasword
                    </Button>
                </Box>

            </div>
        </Box>

    )
}

export default Profile