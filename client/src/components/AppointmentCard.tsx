import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Hidden,
  Typography,
} from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { formatDateRange } from 'utils/date';
import React from 'react';
import { Appointment } from 'store/types';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { patientsSelectors } from 'store/patients';
import { practitionersSelectors } from 'store/practitioners';

interface appointmentProps {
  appointment: Appointment;
}

const useStyles = makeStyles({
  appointmentItem: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    margin: '5px',
  },
});

export const AppointmentCard = ({ appointment }: appointmentProps) => {
  const classes = useStyles();
  console.log(JSON.stringify(appointment, null, 2));
  const patient = useSelector((state) =>
    patientsSelectors.selectById(state.patients, appointment.patientId),
  );
  const practitioner = useSelector((state) =>
    practitionersSelectors.selectById(
      state.practitioners,
      appointment.practitionerId,
    ),
  );

  return (
    <Card key={appointment.id} className={classes.appointmentItem}>
      <Hidden mdDown>
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
      </Hidden>
      <CardContent>
        <Grid>
          <Hidden lgUp>
            <Grid>
              <Typography>
                {formatDateRange({
                  from: new Date(appointment.startDate),
                  to: new Date(appointment.endDate),
                })}
              </Typography>
              <Divider />
            </Grid>
          </Hidden>
          <Grid>
            <Typography>
              Practitioner:
              {practitioner && (
                <Typography>
                  {practitioner.firstName} {practitioner.lastName}
                </Typography>
              )}
            </Typography>
          </Grid>
          <Grid>
            <Divider />
          </Grid>
          <Grid>
            <Typography> Patient: </Typography>{' '}
            {patient && (
              <Typography>
                {patient.firstName} {patient.lastName}
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default AppointmentCard;
