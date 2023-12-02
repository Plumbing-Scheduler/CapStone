import { AlertTitle, Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { tokens } from "../theme.js";
import axiosInstance from "../axiosInstance.js";
import Alert from '@mui/material/Alert';

const Login = () => {
    const mobile = useMediaQuery("(min-width: 620px)")
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [unauth, setUnauth] = useState(false);
    const [noInput, setNoInput] = useState(false);
    const navigate = useNavigate();

    const login = {
        email,
        password
    }

    const handleLogin = () => {

         axiosInstance
            .post('/login', login)
            .then((response) => {
                    axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + response.data.accessToken;
                    localStorage.setItem("ref-loguser", JSON.stringify(response.data.user));
            }).then(() => {
                navigate('/')
            })
            .catch((error) => {
                setUnauth(false);
                setNoInput(false);
                console.log(error)
                if (error.response.status === 401 || error.response.status === 403 ) {
                    setUnauth(true);
                }
                else if (error.response.status === 404) {
                    setNoInput(true);
                }
            })  
    }

    return (<Box minWidth={"500px"}>
        <Box height={"150px"} display="flex" justifyContent="center" alignItems="center" paddingTop={"30px"}>
            <img
                alt="company-logo"
                width="200px"
                src={`../../assets/logo.png`}
                style={{ cursor: 'pointer', borderRadius: '50%' }}
            />
        </Box>
        <Box sx={{ m: 'auto', p: '50px', boxShadow: '4', border: 'solid', borderWidth: "1px", borderRadius: '5px' }}
            width={!mobile? "70%" : '50%'}
        >
            <Typography
                variant="h2"
                height="10vh"
                textAlign="center"
                width={"100%"}
                sx={{ p: '10px', margin: 'auto' }}>
                LOGIN
            </Typography>
            <Box
                display="grid"
                gap="30px"
                // gridTemplateColumns={minwidth1 ? "repeat(4, minmax(0, 1fr))" : minwidth2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
                sx={{ margin: 'auto', width: '90%' }}
            >
                {unauth &&
                    <Alert severity="error">
                        <AlertTitle>Unauthorized</AlertTitle>
                        Incorrect Email and/or Password
                    </Alert>}

                {noInput &&
                    <Alert severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                        Please Fill Out All Fields
                    </Alert>}
                <TextField
                    fullWidth
                    required
                    type="text"
                    variant='filled'
                    label="Email Address"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    required
                    type="password"
                    variant='filled'
                    label="Password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

            </Box>
            <Box width="100%"  p="60px 0">
                <Box
                    backgroundColor={colors.redAccent[500]}
                    display="grid"
                    gap="30px"
                    sx={{ p: '4px', m: 'auto', width: '100px', borderRadius: '4px' }}
                >
                    <Button onClick={handleLogin}>Login</Button>
                </Box>
            </Box>
        </Box>
    </Box>

    )
};

export default Login