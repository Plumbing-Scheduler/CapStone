import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { Box, useTheme } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

const DataList = ({ columnData = [{}], rowData = [{}] }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const minwidth1 = useMediaQuery('(min-width:800px)');
    const minwidth2 = useMediaQuery('(min-width:500px)');
    columnData = [...columnData, {
        field: "Operations", headerName: "Operations", width: 200,  renderCell: ({ row: id }) => {
            return (
                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <Link to={`edit/${id.id}`} className='link mr-auto'>
                        <EditIcon style={{color: colors.primary[100]}}/>
                    </Link>
                    <Link to={`details/${id.id}`} className='link m-auto'>
                        <InfoOutlinedIcon style={{color: colors.primary[100]}} />
                    </Link>
                    <Link to={`delete/${id.id}`} className='link m-auto'>
                        <DeleteOutlineIcon style={{color: colors.primary[100]}}/>
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
                        fontSize: minwidth1 ? '15px' : minwidth2 ? '12px' : '10 px'
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.redAccent[400],
                        borderBottom: "none",
                        fontSize: minwidth1 ? '20px' : minwidth2 ? '15px' : '10 px',
                        color: "black"
                    },
                    "& .MuiDataGrid-VirtualScroller": {
                        backgroundColor: colors.primary[400]
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.redAccent[400]
                    },
                    width: '95%',
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