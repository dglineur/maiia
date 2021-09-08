import React, { useEffect } from 'react';
import { Appointment } from 'store/types';
import { Box, Button, Grid, MenuItem, Select } from '@material-ui/core';
import {
  getPractitioners,
  practitionersSelectors,
  selectedPractitionerId,
  setSelectedPractitionerId,
} from 'store/practitioners';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPatients,
  patientsSelectors,
  selectedPatientId,
  setSelectedPatientId,
} from 'store/patients';
import {
  availabilitiesSelectors,
  getAvailabilities,
  selectedAvailabilityId,
  setSelectedAvailabilityId,
} from 'store/availabilities';
import { createNewAppointment } from 'store/appointments';
import { formatDateRange } from 'utils/date';

const AppointmentForm = () => {
  const dispatch = useDispatch();
  const patientId = useSelector(selectedPatientId);
  const practitionerId = useSelector(selectedPractitionerId);
  const availabilityId = useSelector(selectedAvailabilityId);

  const practitioners = useSelector((state) =>
    practitionersSelectors.selectAll(state.practitioners),
  );

  useEffect(() => {
    dispatch(getPractitioners());
  }, []);

  const patients = useSelector((state) =>
    patientsSelectors.selectAll(state.patients),
  );
  useEffect(() => {
    dispatch(getPatients());
  }, []);

  const availabilities = useSelector((state) =>
    availabilitiesSelectors.selectAll(state.availabilities),
  );

  useEffect(() => {
    if (practitionerId) {
      dispatch(getAvailabilities(practitionerId));
    }
  }, [practitionerId]);

  const handleAppointmentCreation = () => {
    if (selectedAvailabilityId) {
      const selectedAvailability = availabilities.find(
        (availability) => availability.id === availabilityId,
      );
      const appointment: Appointment = {
        id: 0,
        patientId: patientId,
        practitionerId: practitionerId,
        startDate: selectedAvailability.startDate,
        endDate: selectedAvailability.endDate,
      };

      dispatch(createNewAppointment(appointment));
    } else {
      alert('No appointment selected');
    }
  };

  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column" py={2}>
        <Grid item>
          Choose a practitioner :
          <Select
            id={'practitionerList'}
            onChange={(event) =>
              dispatch(setSelectedPractitionerId(event.target.value))
            }
          >
            {practitioners.map((practitioner, index) => {
              return (
                <MenuItem value={practitioner.id} key={index}>
                  {practitioner.firstName} {practitioner.lastName}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item>
          Choose a patient :
          <Select
            id={'patientList'}
            onChange={(event) =>
              dispatch(setSelectedPatientId(event.target.value))
            }
          >
            {patients.map((patient, index) => {
              return (
                <MenuItem value={patient.id} key={index}>
                  {patient.firstName} {patient.lastName}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item>
          Availabilities :
          <Select
            id={'availabilitiesList'}
            onChange={(event) =>
              dispatch(setSelectedAvailabilityId(event.target.value))
            }
          >
            {availabilities.map((availability, index) => {
              return (
                <MenuItem value={availability.id} key={index}>
                  {formatDateRange({
                    from: new Date(availability.startDate),
                    to: new Date(availability.endDate),
                  })}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item>
          <Box py={2}>
            <Button
              variant="outlined"
              onClick={() => handleAppointmentCreation()}
            >
              Create Appointment
            </Button>
          </Box>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default AppointmentForm;
