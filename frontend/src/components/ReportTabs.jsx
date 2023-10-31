import React from "react";
import { Box, Tab, Tabs } from "@mui/material";


const ReportTabs = () => {

    return (
        <Box sx={{ margin: 'auto', width: '100%', boxShadow: "4" }}>
            <Tabs
                // value={value}
                // onChange={handleChange}  
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs  example"
            >
                <Tab value="workorder" label="Work Order" />
                <Tab value="client" label="Client History Report" />
                <Tab value="employee" label="Employee Report" />
                <Tab value="payment" label="Transaction Report" />
                <Tab value="quote" label="Item Quote History Report" />
            </Tabs>
        </Box>
    )
}
export default ReportTabs