import React, { useState, useEffect } from "react";
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
    AppointmentTooltip,
    ConfirmationDialog,
    AppointmentForm,
    ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';
import Header from "../components/Header";
import { tokens } from "../theme";
import axiosInstance from "../axiosInstance";
import useMediaQuery from '@mui/material/useMediaQuery';

const Schedule = () => {
    const theme = useTheme();
    const currDate = Date.now();
    const [data, setData] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const minwidth1 = useMediaQuery('(min-width:800px)');
    const minwidth2 = useMediaQuery('(min-width:500px)');


    useEffect(() => {
        axiosInstance.get('/schedule')
            .then((response) => {
                setData(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);
  
    // Create a new appointment
    const onCommitChanges = ({ changed, deleted }) => {
        let updatedData = data;
        if (changed) {
            updatedData = updatedData.map((app) => (
                changed[app.id] ? { ...app, ...changed[app.id] } : app
            ));
            const edited = updatedData.find((app) => (
                changed[app.id]
            ))
            console.log(edited);
            axiosInstance
                .put(`/schedule/${edited.id}`, edited)
                .then((response) => {
                    console.log(response);
                    axiosInstance
                        .get(`/workorders/${edited.serviceId}`)
                        .then((response) => {
                            console.log(response);
                            const editedWorkOrder = {
                                serviceStatus: response.data.serviceStatus,
                                description: edited.notes,
                                title: edited.title,
                                startDate: edited.startDate,
                                cost: response.data.cost,
                                assignedEmp: response.data.assignedEmp,
                                endDate: edited.endDate,
                                customerID: response.data.customerID,
                                busName: response.data.busName,
                                address: {
                                    street: response.data.address.street,
                                    postalCode: response.data.address.postalCode,
                                    city: response.data.address.city,
                                    province: response.data.address.province
                                }
                            };
                            axiosInstance
                                .put(`/workorders/${response.data._id}`, editedWorkOrder)
                                .then((response => {
                                    console.log(response);
                                }));
                        });
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        if (deleted !== undefined) {
            const deletedObj = updatedData.find((app) => (
                app.id === deleted
            ))
            updatedData = updatedData.filter((app) => (
                app.id != deleted
            ));

            axiosInstance
                .delete(`/schedule/${deleted}`)
                .then(() => {
                    axiosInstance
                        .delete(`/workorders/${deletedObj.serviceId}`)
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        setData(updatedData);
    };

    // Determine if the screen width is smaller than a specific breakpoint
    const isMobile = window.innerWidth <= 768; // You can adjust the breakpoint as needed

    return (
        <div>
            <Header title="SCHEDULE" subtitle="Calendar" />
            <div className={`text-center sm:max-2xl:flex justify-between p-2 m-3 shadow-lg `}>
                {loading ? (
                    <div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>
                ) : (
                    <Paper variant="h4">
                        <Box flex="1 1 20%">
                            <Scheduler data={data}>
                                <ViewState defaultCurrentDate={currDate} defaultCurrentViewName={isMobile ? "Day" : "Week"} />
                                <EditingState
                                    onCommitChanges={onCommitChanges}
                                />
                                <IntegratedEditing />
                                {minwidth2 ? <WeekView startDayHour={6} endDayHour={18} cellDuration={60} /> : null}
                                {minwidth1 ? <DayView startDayHour={6} endDayHour={18} cellDuration={60} /> : null}
                                <DayView startDayHour={6} endDayHour={18} cellDuration={60} />
                                <WeekView startDayHour={6} endDayHour={18} cellDuration={60} />
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
