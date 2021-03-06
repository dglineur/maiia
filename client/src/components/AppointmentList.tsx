import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appointmentsSelectors, getAppointments } from 'store/appointments';
import AppointmentCard from 'components/AppointmentCard';
import { makeStyles } from '@material-ui/styles';
import { AppState } from 'store';

//use of makeStyle instead of traditional scss to avoid scss with hundreds of lines
const useStyles = makeStyles({
  appointmentCard: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});

const AppointmentList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const appointments = useSelector((state: AppState) =>
    appointmentsSelectors.selectAll(state.appointments),
  );

  useEffect(() => {
    dispatch(getAppointments());
  }, []);

  return (
    <div className={classes.appointmentCard} datacy={'appointment-list'}>
      {appointments.map((appointment, index) => (
        <AppointmentCard key={index} appointment={appointment} />
      ))}
      )
    </div>
  );
};

export default AppointmentList;
