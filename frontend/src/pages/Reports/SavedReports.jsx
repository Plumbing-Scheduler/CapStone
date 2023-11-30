import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'
import { Box } from '@mui/material'
import DataList from '../../components/DataList'
import Header from '../../components/Header'
import Spinner from 'react-bootstrap/Spinner';
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat';
const SavedReports = () => {
    const [ loading, setLoading ] = useState(true);
    const [ reports, setReports ] = useState([{}])
    dayjs(localizedFormat);

    useEffect(() => {
        setLoading(true);
        axiosInstance
            .get('/report')
            .then((response)=> {
                setReports(response.data.data);
                console.log(response.data.data)
                setLoading(false)
            }).catch((error) => {
                console.log(error);
                setLoading(false)
            });
    }, [])

    const rows = reports.map((elem) => ({
        id: elem._id,
        name: elem.name,
        date: dayjs(elem.date).format('l'),
        description: elem.description
    }))

    const columns = [
        {field: 'name', headerName: "Name", flex: 1},
        {field: 'date', headerName: "Date", flex: 1, },
        {field: 'description', headerName: "Description", flex: 1},
    ]

    return (
        <Box>
            <Header title="EMPLOYEE" subtitle="View Employees" />
            <div className='flex justify-end' >
                
            </div>
            {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
                <DataList columnData={columns} rowData={rows} hideEdit={true}/>
            )}
        </Box>
    )
}

export default SavedReports