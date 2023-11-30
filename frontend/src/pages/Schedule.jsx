import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import Spinner from 'react-bootstrap/Spinner';
import {
    Box,
    Paper,
    useTheme,
} from "@mui/material";
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
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
    ViewSwitcher
} from '@devexpress/dx-react-scheduler-material-ui';
import Header from "../components/Header";
import { tokens } from "../theme";
import useMediaQuery from '@mui/material/useMediaQuery';

const Schedule = ({ role = '', logId = '' }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const currDate = Date.now();
    const [data, setData] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const minwidth1 = useMediaQuery('(min-width:800px)');
    const minwidth2 = useMediaQuery('(min-width:500px)');


    useEffect(() => {
        axiosInstance.get('/schedule')
            .then((response) => {
                console.log(response.data.data)
                setData(response.data.data.map((app) => ({
                    title: app.title,
                    startDate: app.startDate,
                    endDate: app.endDate,
                    serviceId: app.serviceId,
                    empId: app.empId,
                    id: app._id,
                    notes: app.notes,
                    address: {
                        street: app.address.street,
                        postalCode: app.address.postalCode,
                        city: app.address.city,
                        province: app.address.province
                    },
                    serviceStatus: app.serviceStatus
                })).filter((elem) => {
                    return elem.serviceStatus !== "Completed";
                }));
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);


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
                app.id !== deleted
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

    const WeekTimeTableCell = (props) => {
        return <WeekView.TimeTableCell {...props} onDoubleClick={undefined} />;
    };
    const DayTimeTableCell = (props) => {
        return <DayView.TimeTableCell {...props} onDoubleClick={undefined} />;
    };
    const MonthTimeTableCell = (props) => {
        return <MonthView.TimeTableCell {...props} onDoubleClick={undefined} />;
    };

    const appointment = (props) => {
        return <Appointments.Appointment
            {...props}
            style={(props.data.empId === logId) ? { backgroundColor: colors.redAccent[400] } : {}}
            children={
                <div className="text-white">
                    {props.children}
                    {(props.data.empId === logId) ? ("You") : ("")}
                </div>
            } />;
    };
    const weekCell = (props) => {
        return <DayView.Layout {...props} style={{ color: colors.redAccent[400] }} />;
    };

    const SchedulerRoot = (props) => {
        return <Scheduler.Root>
            {props.children}
        </Scheduler.Root>
    }

    const AppContent = (props) => {
        return <Appointments.AppointmentContent {...props} />;
        // children={<Box >
        //         {props.data.startDate}
        //     </Box>} 
    };
    const TooltipContent = (props) => {
        return <AppointmentTooltip.Content
            {...props}
            children={<div className="pl-4">

                {props.appointmentData.address.street &&
                    <div>
                        <div>Location</div>
                        <div className="ml-2">
                            {props.appointmentData.address.street + ", "}
                            {props.appointmentData.address.postalCode}
                        </div>
                        <div className="ml-2">
                            {props.appointmentData.address.city + ", "}
                            {props.appointmentData.address.province}
                        </div>
                    </div>
                }
                <br />
                <div>
                    <div>Description</div>
                    <div className="ml-2">{props.appointmentData.notes}</div>
                </div>
            </div>} />;
    };
    const AppFormBooleanLayout = (props) => {
        return null;
    };

    const readOnly = (role) => {
        if (role === "Management") {
            return false;
        }
        return true;
    };


    return (
        <div>
            <Header title="SCHEDULE" subtitle="Calendar" />
            <div className={`text-center flex justify-between pb-5 m-3 shadow-xl`}>
                {loading ? (
                    <div className='w-5 m-auto h-5 pt-11 text-center'><Spinner /></div>
                ) : (
                    <Paper variant="h4" >
                        <Box flex="1 1 20%" >
                            <Scheduler
                                data={data}
                                rootComponent={SchedulerRoot}
                            >
                                <ViewState defaultCurrentDate={currDate} />
                                <EditingState
                                    onCommitChanges={onCommitChanges}
                                />
                                <IntegratedEditing />
                                {minwidth2 ?
                                    <WeekView
                                        startDayHour={6}
                                        endDayHour={18}
                                        cellDuration={60}
                                        timeTableCellComponent={WeekTimeTableCell} /> :
                                    null}
                                {minwidth1 ?
                                    <DayView
                                        startDayHour={6}
                                        endDayHour={18}
                                        cellDuration={60}
                                        timeTableCellComponent={DayTimeTableCell} /> :
                                    null}
                                <DayView startDayHour={6} endDayHour={20} cellDuration={60} timeTableCellComponent={DayTimeTableCell} layoutComponent={weekCell} />
                                <WeekView startDayHour={6} endDayHour={20} cellDuration={60} timeTableCellComponent={WeekTimeTableCell} />
                                <MonthView timeTableCellComponent={MonthTimeTableCell} />
                                <Appointments
                                    appointmentContentComponent={AppContent}
                                    appointmentComponent={appointment}
                                />
                                <AppointmentTooltip
                                    showOpenButton
                                    showDeleteButton={role === "Management"}
                                    showCloseButton
                                    contentComponent={TooltipContent}
                                />
                                <ConfirmationDialog />
                                <AppointmentForm
                                    readOnly={readOnly(role)}
                                    booleanEditorComponent={AppFormBooleanLayout}
                                />
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
