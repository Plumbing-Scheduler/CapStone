import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { Box, useTheme } from '@mui/material';
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
        field: "Operations", headerName: "Ops", width: 100,  renderCell: ({ row: id }) => {
            return (
                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-evenly", gap: "20px" }}>
                    <Link to={`edit/${id.id}`} className='link '>
                        <EditIcon style={{color: colors.primary[100]}}/>
                    </Link>
                    <Link to={`details/${id.id}`} className='link '>
                        <InfoOutlinedIcon style={{color: colors.primary[100]}} />
                    </Link>
                </Box>
            )
        }
    }]
    
    return (
        <div>
            <Box m="40px"
                height="608px"
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
                        // borderBottom: "none",
                        fontSize: minwidth1 ? '20px' : minwidth2 ? '15px' : '10 px',
                        color: "black",
                    },
                    "& .MuiDataGrid-VirtualScroller": {
                        backgroundColor: colors.primary[400]
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.redAccent[400]
                    },
                    "& .MuiTablePagination-root": {
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'black'
                    },
                    "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows" :{
                        margin: "auto 0",
                    },
                    "& .MuiButtonBase-root": {
                        color: 'black'
                    },
                    width: 'auto',
                    margin: "0 5%",
                }}
            >
                <DataGrid
                    columns={columnData}
                    rows={rowData}
                    rowHeight={50}
                    
                    initialState={{
                        ...rowData.initialState,
                        pagination: { paginationModel: { pageSize: 10 } }
                    }}
                    pageSizeOptions={[10, 25, 50, 100]}
                />
            </Box>
        </div>
    )
}

export default DataList