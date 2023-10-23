import { Box, Typography, useTheme } from "@mui/material";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataTeam } from "../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

const Reports = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell", },
        { field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left", },
        { field: "phone", headerName: "Phone Number", flex: 1, },
        { field: "email", headerName: "Email", flex: 1, },
        {
            field: "access", headerName: "Access Level", flex: 1, renderCell: ({ row: { access } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            access === "admin"
                                ? colors.redAccent[600]
                                : colors.greenAccent[700]
                        }
                        borderRadius="4px"
                    >
                        {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
                        {access === "manager" && <SecurityOutlinedIcon />}
                        {access === "user" && <LockOpenOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {access}
                        </Typography>
                    </Box>
                )
            }
        },

    ];

    return (<div className=" m-10 p-2">
        <Header title="REPORTS" subtitle="Select Report" />
        <div className=' shadow-lg '>
            <Box m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "ActiveBorder",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none"
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300]
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.redAccent[400],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-VirtualScroller": {
                        backgroundColor: colors.primary[400]
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.redAccent[400]
                    }

                }}>
                <DataGrid
                    rows={mockDataTeam}
                    columns={columns}

                />
            </Box>
        </div>
    </div>
    )
}

export default Reports; 