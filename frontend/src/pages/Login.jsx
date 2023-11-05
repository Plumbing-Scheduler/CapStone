import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../theme.js";
import { Link } from "react-router-dom";

const Login = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (<Box>
        <Box display="flex" justifyContent="center" alignItems="center">
            <img
                alt="company-logo"
                width="100px"
                height="100px"
                src={`../../assets/companylogo.png`}
                style={{ cursor: 'pointer', borderRadius: '50%' }}
            />
        </Box>
        <Box sx={{ m: 'auto', width: '50%', p: '50px', boxShadow: '4', border: 'solid', borderWidth: "1px", borderRadius: '5px' }}>
            <Typography
                variant="h2"
                height="10vh"
                textAlign="center"
                sx={{ p: '10px', margin: '20px' }}>
                LOGIN
            </Typography>
            <Box
                display="grid"
                gap="30px"
                // gridTemplateColumns={minwidth1 ? "repeat(4, minmax(0, 1fr))" : minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
                sx={{ margin: 'auto', width: '90%' }}
            >
                <TextField
                    fullWidth
                    required
                    type="text"
                    variant='filled'
                    label="Email Address"
                    name="email"
                    id="email"
                />
                <TextField
                    fullWidth
                    required
                    type="text"
                    variant='filled'
                    label="Password"
                    name="password"
                    id="password"

                />

            </Box>
            <Box m="30px" p="60px">
                <Box
                    backgroundColor={colors.redAccent[500]}
                    display="grid"
                    gap="30px"
                    sx={{ p: '4px', m: 'auto', width:'90%', borderRadius: '4px' }}
                >
                    <Button >Login</Button>
                </Box>
            </Box>
        </Box>
    </Box>

    )
};

export default Login