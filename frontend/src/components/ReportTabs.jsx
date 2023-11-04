import React from "react";
import { Box, Tab, Tabs, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Link } from 'react-router-dom';

const ReportTabs = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [value, setValue] = React.useState('workorder')

    const reports = ["/routes"]

    // ({ columnData = [{}], rowData = [{}] })
    // columnData = [...columnData, {
    //     field: "Operations", headerName: "Operations", width: 200,  renderCell: ({ row: id }) => {
    //         return (
    //             <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
    //                 <Link to={`edit/${id.id}`} className='link mr-auto'>
    //                     <Tabs />
    //                 </Link>
    //                 <Link to={`details/${id.id}`} className='link m-auto'>

    //                 </Link>
    //                 <Link to={`delete/${id.id}`} className='link m-auto'>

    //                 </Link>
    //             </Box>
    //         )
    //     }
    // },]

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    return (
        <Box sx={{ margin: 'auto', width: '63%', ml: '64px', boxShadow: "4" }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs  example"
            >
                <Link to={``}>
                    <Tab value="workorder" label="Work Order" />
                </Link>
                <Link to={`clients`}>
                    <Tab value="client" label="Client History Report" />
                </Link>

                <Tab value="employee" label="Employee Report" />
                <Tab value="payment" label="Transaction Report" />
                <Tab value="quote" label="Quote History Report" />
            </Tabs>
        </Box>
    )
}
export default ReportTabs