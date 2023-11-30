import { Box, Button, useTheme } from "@mui/material";
import Header from "../components/Header";
import ReportFilter from "../components/ReportFilter";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";

export const Reports = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const toSaved = () => {
        navigate('saved');
    }
    return (
        <Box>
            <Box>
                <div className="flex justify-between">
                    <Header title="REPORTS" subtitle="Filter Reports" />
                    <Box sx={{ width: "auto", margin: "auto 50px", backgroundColor: colors.buttonBase, color: 'white', borderRadius: '3px', }}>
                        <Button
                            sx={{ margin: "auto", backgroundColor: colors.buttonBase, color: 'white', borderRadius: '3px', }}
                            onClick={toSaved}
                        >
                            Show Saved Reports
                        </Button>
                    </Box>
                </div>
            </Box >
            <Box display="full">
            
                <ReportFilter />
            </Box>
        </Box>
    )
}

export default Reports;