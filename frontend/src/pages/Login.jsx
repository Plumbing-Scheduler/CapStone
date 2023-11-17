import { AlertTitle, Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../theme.js";
import axiosInstance from "../axiosInstance.js";
import Alert from '@mui/material/Alert';

const Login = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [unauth, setUnauth] = useState(false);
    const [noInput, setNoInput] = useState(false);

    const login = {
        email,
        password
    }

    const handleLogin = async () => {

        await axiosInstance
            .post('/login', login)
            .then((response) => {
                axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + response.data.accessToken;
                console.log(response.data);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }).then(() => {
                window.location.reload()
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
            <Box m="30px" p="60px">
                <Box
                    backgroundColor={colors.redAccent[500]}
                    display="grid"
                    gap="30px"
                    sx={{ p: '4px', m: 'auto', width: '90%', borderRadius: '4px' }}
                >
                    <Button onClick={handleLogin}>Login</Button>
                </Box>
            </Box>
        </Box>
    </Box>

    )
};

export default Login