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

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    @Transactional
    public List<Availability> generateAvailabilities(Integer practitionerId) {
        //need to check if practitionner exist

        //clean availabilities for this practitioner
        availabilityRepository.deleteAllByPractitionerId(practitionerId);

        //need timeslot for practitioner
        //FIXME : Why this service ask string instead of integer, rework to do ? in bdd it's integer
        List<TimeSlot> timeslots = timeSlotRepository.findByPractitionerId(practitionerId);

        //need appointment for practitioner
        List<Appointment> appointments = appointmentRepository.findByPractitionerId(practitionerId);

        List<Availability> allAvailabilities = generate(practitionerId, timeslots, appointments);
        availabilityRepository.saveAll(allAvailabilities);
        return allAvailabilities;
    }

    private List<Availability> generate(Integer practitionerId, List<TimeSlot> timeSlots, List<Appointment> appointments) {
        //for each timeslot, a 15min span make an availability,
        List<Availability> lstAvailabilities = new ArrayList<Availability>();

        for (TimeSlot timeSlot : timeSlots) {
            LocalDateTime startCursor = timeSlot.getStartDate();
            LocalDateTime endCursor = timeSlot.getStartDate().plusMinutes(AVAILABILITY_SPAN);
            while (startCursor.compareTo(timeSlot.getEndDate()) < 0 ) {
                List<Appointment> overlappingAppointments = searchOverlappingAppointments(endCursor, appointments);
                if (overlappingAppointments.size() == 0) {
                    lstAvailabilities.add(Availability.builder().practitionerId(practitionerId).startDate(startCursor).endDate(endCursor).build());
                    startCursor = endCursor;
                }
                else {
                    startCursor = overlappingAppointments.stream().map(Appointment::getEndDate).max(LocalDateTime::compareTo).get();
                }

                if(startCursor.plusMinutes(AVAILABILITY_SPAN).compareTo(timeSlot.getEndDate()) < 0) {
                    endCursor = startCursor.plusMinutes(AVAILABILITY_SPAN);
                }
                else {
                    endCursor = timeSlot.getEndDate();
                }
            }
        }

        return lstAvailabilities;
    }

    private List<Appointment> searchOverlappingAppointments(LocalDateTime timeToCheck, List<Appointment> appointments) {
        return appointments.stream().filter(appointment -> timeToCheck.compareTo(appointment.getStartDate()) > 0 && timeToCheck.compareTo(appointment.getEndDate()) <= 0).collect(Collectors.toList());
    }
}
