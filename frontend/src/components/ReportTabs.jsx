import React from "react";
import { Box, Tab, Tabs, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Link } from 'react-router-dom';

const ReportTabs = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [value, setValue] = React.useState('workorder')


    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    return (
        <Box sx={{ margin: 'auto', boxShadow: "4" }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs  example"
            >
                <Link to={``}>
                    <Tab value="workorder" label="Service History" />
                </Link>
                <Link to={`customerreports`}>
                    <Tab value="customer" label="Customer History" />
                </Link>
                <Link to={`employeereports`}>
                    <Tab value="employee" label="Employee Report" />
                </Link>
                <Link to={`transactionreports`}>
                    <Tab value="transaction" label="Transaction History" />
                </Link>
                {/* <Link to={`quotehistoryreports`}>
                    <Tab value="quotehistoryreports" label="Quote History Report" />
                </Link> */}
        </Tabs>
        </Box >
    )
}
export default ReportTabs