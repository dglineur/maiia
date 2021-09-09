import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { formatDateRange } from 'utils/date';
import React from 'react';
import { Appointment } from 'store/types';
import { makeStyles } from '@material-ui/styles';

interface appointmentProps {
  appointment: Appointment;
}

const useStyles = makeStyles({
  appointmentItem: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});

export const AppointmentCard = ({ appointment }: appointmentProps) => {
  const classes = useStyles();
  return (
    <Card key={appointment.id} className={classes.appointmentItem}>
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
};
export default AppointmentCard;
