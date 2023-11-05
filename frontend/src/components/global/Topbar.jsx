import { Box, IconButton, useTheme, Button } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    // return(<Box display = "flex" justifyContent="space-between" p={2}>
    //     {/* {Search Bar} */}
    //     <Box display= "flex" backgroundColor={colors.primary[400]} borderRadius="3px">
    //         <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search"/>
    //         <IconButton type="button" sx={{ p:1 }}>
    //         <SearchIcon />
    //         </IconButton>
    //     </Box>

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
            <Link to={`login`}>
                <IconButton>
                    < PersonOutlinedIcon />
                </IconButton>
            </Link>
            <IconButton>

            </IconButton>
        </div>
    </div>
    );
};

export default Topbar;