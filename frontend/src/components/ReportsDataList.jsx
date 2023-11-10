import React from 'react'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { Box, useTheme } from '@mui/material';

const ReportsDataList = ({ columnData = [{}], rowData = [{}] }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box>
            <Box mt ="40px 0 0 0"
                height="70vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell: focus ": {
                        outline: "none !important",
                        borderBottom: "solid 1px grey",
                        fontSize: "13px",
                    },
                    
                    "& .MuiDataGrid-row:selected": {
                        backgroundColor: colors.redAccent[400],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.redAccent[400],
                        borderBottom: "none",
                        fontSize: "15px",
                        color: "black"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        // backgroundColor: colors.primary[600]
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.redAccent[400],
                    
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                        m: "10px"
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.primary[200]} !important`
                    },
                    
                }}
            >
                <DataGrid
                    columns={columnData}
                    rows={rowData}
                    checkboxSelection
                    components={{ Toolbar: GridToolbar }}
                    rowHeight={60}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } }
                    }}
                    pageSizeOptions={[10, 25, 50, 100]}
                />
            </Box>
        </Box>
    )
}

export default ReportsDataList