import { Menu, MenuItem, IconButton, useTheme, Button, Box } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { useCookies } from 'react-cookie';

const Topbar = () => {
    const [cookies, removeCookie] = useCookies(['loggedIn']);
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        //alert(99);
        axiosInstance
            .get('/logout')
            .then(() => {
                //delete AccessToken in browser
                axiosInstance.defaults.headers.common['Authorization'] = null;
                localStorage.clear();
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            });
    };

    return (<div className="flex justify-between p-3" >
        <Link to='..' relative="path" className="link">
            <div className="hidden md:max-2xl:flex rounded-sm bg-gray-600">
                <Button variant="Text"> Back</Button>
            </div>
        </Link>
        {/* Icons */}
        <div className="flex">
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? (
                    < DarkModeOutlinedIcon />
                ) : (
                    < LightModeOutlinedIcon />
                )}
            </IconButton>
            {/* <IconButton>
                < NotificationsOutlinedIcon />
            </IconButton> */}
            <IconButton>
                < SettingsOutlinedIcon />
            </IconButton>


            <IconButton
                onClick={handleClick}>
                < PersonOutlinedIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                color={colors.primary[100]}
                
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}

            >
                <MenuItem onClick={handleLogout}>
                    Log Out
                </MenuItem>
                <MenuItem >
                    <Link className="link" to={'/profile'}>
                        Profile
                    </Link>
                </MenuItem>
            </Menu>
            <IconButton>

            </IconButton>
        </div>
    </div>
    );
};

export default Topbar;