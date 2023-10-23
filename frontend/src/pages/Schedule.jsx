import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import {
    Box,
    Paper,
    useTheme,
} from "@mui/material";
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
import Header from "../components/Header";
import { tokens } from "../theme";

const Schedule = () => {
    const theme = useTheme();
    const currDate = Date.now();
    const [data, setData] = useState([{}]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3500/schedule')
            .then((response) => {
                setData(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    // Determine if the screen width is smaller than a specific breakpoint
    const isMobile = window.innerWidth <= 768; // You can adjust the breakpoint as needed

    return (
        <div>
            <Header title="SCHEDULE" subtitle="Calendar" />
            <div className={`text-center sm:max-2xl:flex justify-between p-2 m-3 shadow-lg ${isMobile ? 'mobile-styles' : 'desktop-styles'}`}>
                {loading ? (
                    <div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>
                ) : (
                    <Paper variant="h4">
                        <Box flex="1 1 20%">
                            <Scheduler data={data}>
                                <ViewState defaultCurrentDate={currDate} defaultCurrentViewName={isMobile ? "Day" : "Week"} />
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
    );
};

export default Schedule;
