import { Menu, MenuItem, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";


const Topbar = ({ mobile = '', role = '' }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    const navigate = useNavigate();


    const handleClickUser = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        axiosInstance
            .get('/logout')
            .then(() => {
                //delete AccessToken in browser
                axiosInstance.defaults.headers.common['Authorization'] = null;
                localStorage.clear();
                navigate("/");
                window.location.reload()

            })
            .catch((err) => {
                console.log(err)
            });
    };

    return (
        <div className="flex justify-end mr-3 mt-3 mb-3 w-1/4 relative" >
            <div className="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        < DarkModeOutlinedIcon />
                    ) : (
                        < LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton
                    onClick={handleClickUser}>
                    < PersonOutlinedIcon />
                </IconButton>
            </div>
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
                sx={{
                    ".MuiMenu-paper": {
                        backgroundColor: colors.buttonBase
                    }, color: 'white'
                }}

            >
                <MenuItem onClick={handleClose}>
                    <Link className="link" to={'/profile'}>
                        Profile
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: 'white' }}>
                    Log Out
                </MenuItem>

            </Menu>

        </div>

    );
};

export default Topbar;