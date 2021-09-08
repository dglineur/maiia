import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appointmentsSelectors, getAppointments } from 'store/appointments';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { formatDateRange } from 'utils/date';

const AppointmentList = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) =>
    appointmentsSelectors.selectAll(state.appointments),
  );

  useEffect(() => {
    dispatch(getAppointments());
  }, []);

  return (
    <div>
      {appointments.map((appointment, index) => {
        return (
          <Card key={appointment.id}>
            <CardHeader
              avatar={<CalendarTodayIcon />}
              title={
                <Typography>
                  {formatDateRange({
                    from: new Date(appointment.startDate),
                    to: new Date(appointment.endDate),
                  })}
                </Typography>
              }
            />
            <CardContent>
              <pre>
                <code>{JSON.stringify(appointment, null, 2)}</code>
              </pre>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AppointmentList;
