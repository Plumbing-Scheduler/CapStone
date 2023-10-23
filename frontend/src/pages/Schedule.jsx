import { Box } from "@mui/material";
import Header from "../components/Header";
import { Paper, useTheme } from "@mui/material";
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    WeekView,
    MonthView,
    Appointments,
    Toolbar,
    DateNavigator,
    ViewSwitcher
} from '@devexpress/dx-react-scheduler-material-ui';
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import { tokens } from "../theme";

const Schedule = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState(true)
    const currDate = Date.now();
    const [data, setData] = useState([{}]);
    //    const data = [{ startDate: '2023-10-10T09:45', endDate: '2023-10-10T11:00', title: 'Meeting' },
    //    { startDate: '2023-10-09T12:00', endDate: '2023-10-09T13:30', title: 'Go to a gym'  }]

    useEffect(() => {
        axios
            .get('http://localhost:3500/schedule')
            .then((response) => {
                setData(response.data.data)
                setLoading(false)
                //console.log(response.data.data)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
            })
    }, []);
    return <div>
        <Header title="SCHEDULE" subtitle="Calendar" />
        <div className='text-center sm:max-2xl:flex justify-between p-2 m-3 shadow-lg' >
            {loading ? (<div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>) : (
                <Paper variant="h4">
                    <Box flex="1 1 20%" >
                        <Scheduler data={data} >
                            <ViewState defaultCurrentDate={currDate} defaultCurrentViewName="Week" />

                            <DayView startDayHour={6} endDayHour={18} />
                            <WeekView startDayHour={6} endDayHour={18} />
                            <MonthView />

                            <Appointments />
                            <Toolbar />
                            <DateNavigator />
                            <ViewSwitcher />
                        </Scheduler>
                    </Box>
                </Paper>
            )}

        </div>
    </div>
}

export default Schedule;