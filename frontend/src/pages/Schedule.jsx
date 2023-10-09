import { Box } from "@mui/material";
import Header from "../components/Header";
import {Paper} from "@mui/material";
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


const Schedule = () => {
    const currDate = Date.now();
    const [ data, setData] = useState([{}]);

    useEffect(() => {
        axios
            .get('http://localhost:3500/schedule')
            .then((response) => {
                setData(response.data.data)
                console.log(data)
            })
    }, [])
    return <Box m="20px">
        <Header title="SCHEDULE" subtitle="Calendar" />
        <Paper>
            <Scheduler data={data}>
            <ViewState defaultCurrentDate={currDate} defaultCurrentViewName="Week" />

            <DayView startDayHour={9} endDayHour={14} />
            <WeekView startDayHour={9} endDayHour={14} />
            <MonthView />

            <Appointments />
            <Toolbar />
            <DateNavigator />
            <ViewSwitcher />
            </Scheduler>
            </Paper>
    </Box>
}

export default Schedule;