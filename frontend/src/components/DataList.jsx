import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { Box, useTheme } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link } from 'react-router-dom';

const DataList = ({ columnData = [{}], rowData = [{}] }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    columnData = [...columnData, {
        field: "Operations", headerName: "Operations", width: 200,  renderCell: ({ row: id }) => {
            return (
                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <Link to={`edit/${id.id}`} className='link mr-auto'>
                        <EditIcon />
                    </Link>
                    <Link to={`details/${id.id}`} className='link m-auto'>
                        <InfoOutlinedIcon />
                    </Link>
                    <Link to={`delete/${id.id}`} className='link m-auto'>
                        <DeleteOutlineIcon />
                    </Link>
                </Box>
            )
        }
    },]
    
    return (
        <div>
            <Box m="40px"
                height="55vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "ActiveBorder",
                    },
                    "& .MuiDataGrid-cell:focus": {
                        outline: "none !important",
                    },
                    "& .MuiDataGrid-row:selected": {
                        backgroundColor: colors.redAccent[400],
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "solid 1px grey",
                        fontSize: "14px",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.redAccent[400],
                        borderBottom: "none",
                        fontSize: "20px",
                        color: "black"
                    },
                    "& .MuiDataGrid-VirtualScroller": {
                        backgroundColor: colors.primary[400]
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.redAccent[400]
                    },
                    width: "90%",
                    margin: "0 auto"
                }}
            >
                <DataGrid
                    columns={columnData}
                    rows={rowData}
                    rowHeight={60}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } }
                    }}
                    pageSizeOptions={[10, 25, 50, 100]}
                />
            </Box>
        </div>
    )
}

export default DataList