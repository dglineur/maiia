package com.maiia.pro.service;

import com.maiia.pro.entity.Appointment;
import com.maiia.pro.entity.Availability;
import com.maiia.pro.entity.TimeSlot;
import com.maiia.pro.exception.NotImplementedException;
import com.maiia.pro.repository.AppointmentRepository;
import com.maiia.pro.repository.AvailabilityRepository;
import com.maiia.pro.repository.TimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProAvailabilityService {

    @Autowired
    private AvailabilityRepository availabilityRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    private int AVAILABILITY_SPAN = 15;

    public List<Availability> findByPractitionerId(Integer practitionerId) {
        return availabilityRepository.findByPractitionerId(practitionerId);
    }

    public List<Availability> generateAvailabilities(Integer practitionerId) {
        //need to check if practitionner exist

        //clean availabilities for this practitioner
        availabilityRepository.deleteAllByPractitionerId(practitionerId);

        //need timeslot for practitioner
        //FIXME : Why this service ask string instead of integer, rework to do ? in bdd it's integer
        List<TimeSlot> timeslots = timeSlotRepository.findByPractitionerId(practitionerId);

        //need appointment for practitioner
        List<Appointment> appointments = appointmentRepository.findByPractitionerId(practitionerId);


        return generate(practitionerId, timeslots, appointments);
    }

    private List<Availability> generate(Integer practitionerId, List<TimeSlot> timeSlots, List<Appointment> appointments) {
        //for each timeslot, a 15min span make an availability,
        List<Availability> lstAvailabilities = new ArrayList<Availability>();

        for (TimeSlot timeSlot : timeSlots) {
            //If the 15min are available, 1 availability
            LocalDateTime startCursor = timeSlot.getStartDate();
            LocalDateTime endCursor = timeSlot.getStartDate().plusMinutes(AVAILABILITY_SPAN);

            while(endCursor.compareTo(timeSlot.getEndDate()) <= 0) {
                if(!isOverlappingAppointment(endCursor, appointments)) {
                    lstAvailabilities.add(Availability.builder().practitionerId(practitionerId).startDate(startCursor).endDate(endCursor).build());
                }
                startCursor = endCursor;
                endCursor = endCursor.plusMinutes(AVAILABILITY_SPAN);

            }
            //if the period is less than 15min
            //if an appointment end before the 15min period, test the new availability at the end of the appointment
            //if an appointment is not ended before the 15min period,
        }

        return lstAvailabilities;
    }

    private boolean isOverlappingAppointment(LocalDateTime timeToCheck, List<Appointment> appointments) {
        long nbOfOccurences = appointments.stream().filter(appointment -> timeToCheck.isAfter(appointment.getStartDate()) && timeToCheck.isBefore(appointment.getEndDate())).count();
        return nbOfOccurences != 0 ? true : false;
    }
}
