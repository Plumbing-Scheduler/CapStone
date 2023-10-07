import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";


const Header = ({ title, subtitle}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return <Box m={"20px"}>
    <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ mb: "5" }}>{title}</Typography>
    <Typography variant="h4" color={colors.redAccent[500]}>{subtitle}</Typography>
    </Box>
}

export default Header;