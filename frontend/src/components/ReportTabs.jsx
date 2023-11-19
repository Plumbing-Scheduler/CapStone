// import React from "react";
// import { Box, Tab, useTheme } from "@mui/material";
// import { tokens } from "../theme";
// import { Link } from 'react-router-dom';

// const ReportTabs = () => {
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);

//     return (
//         <Box sx={{ margin: 'auto', boxShadow: "4" }}>
//             <Box
//                 sx={{
//                     "& .MuiButtonBase-root": {
//                         color: `${colors.grey[100]} !important`,
//                         border: "none",
//                         fontSize: "13px",
//                     },
//                     "& .MuiTab-root:focus": {
//                         outline: "none !important",
//                         borderBottom: "solid 1px grey",
//                         fontSize: "16px",
//                     },
//                     "& .MuiButtonBase-root:focus": {
//                         color: `${colors.redAccent[400]} !important`,
//                     },
//                 }}

//             >
//                 <Link to={``}>
//                     <Tab value="service" label="Service History" />
//                 </Link>
//                 <Link to={`customerreports`}>
//                     <Tab value="customer" label="Customer History" />
//                 </Link>
//                 <Link to={`employeereports`}>
//                     <Tab value="employee" label="Employee Report" />
//                 </Link>
//                 <Link to={`transactionreports`}>
//                     <Tab value="transaction" label="Transaction History" />
//                 </Link>
//                 {/* <Link to={`quotehistoryreports`}>
//                     <Tab value="quotehistoryreports" label="Quote History Report" />
//                 </Link> */}
//             </Box>
//         </Box >
//     )
// }
// export default ReportTabs