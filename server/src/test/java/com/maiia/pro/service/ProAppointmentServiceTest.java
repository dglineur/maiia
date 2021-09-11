package com.maiia.pro.service;

import com.maiia.pro.EntityFactory;
import com.maiia.pro.entity.Appointment;
import com.maiia.pro.repository.AppointmentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class ProAppointmentServiceTest {
    private final EntityFactory entityFactory = new EntityFactory();

    @Autowired
    private AppointmentRepository appointmentRepository;

    @BeforeEach
    public void clearData() {
        appointmentRepository.deleteAll();
    }

    //get one
    @Test
    void checkGetOfOneAppointmentReturnTheCorrectAppointment() {
        //create 2 appointments
        LocalDateTime start1 = LocalDateTime.of(2020, Month.FEBRUARY, 5, 11, 0, 0);
        LocalDateTime end1 = LocalDateTime.of(2020, Month.FEBRUARY, 5, 11, 15, 0);
        LocalDateTime start2 = LocalDateTime.of(2020, Month.FEBRUARY, 5, 8, 0, 0);
        LocalDateTime end2 = LocalDateTime.of(2020, Month.FEBRUARY, 5, 8, 15, 0);
        Appointment appointment1 = appointmentRepository.save(entityFactory.createAppointment(1, 1, start1, end1));
        Appointment appointment2 = appointmentRepository.save(entityFactory.createAppointment(2, 2, start2, end2));

        //get 1
        Optional<Appointment> returnAppointment = appointmentRepository.findById(appointment1.getId());

        //verify it matchs
        assert(returnAppointment.get().getId()).equals(appointment1.getId());
        assert(returnAppointment.get().getPatientId()).equals(appointment1.getPatientId());
        assert(returnAppointment.get().getPractitionerId()).equals(appointment1.getPractitionerId());
        assert(returnAppointment.get().getStartDate()).equals(appointment1.getStartDate());
        assert(returnAppointment.get().getEndDate()).equals(appointment1.getEndDate());

        //get 2
        returnAppointment = appointmentRepository.findById(appointment2.getId());

        //verify it matchs
        assert(returnAppointment.get().getId()).equals(appointment2.getId());
        assert(returnAppointment.get().getPatientId()).equals(appointment2.getPatientId());
        assert(returnAppointment.get().getPractitionerId()).equals(appointment2.getPractitionerId());
        assert(returnAppointment.get().getStartDate()).equals(appointment2.getStartDate());
        assert(returnAppointment.get().getEndDate()).equals(appointment2.getEndDate());
    }

    //update
    @Test
    void checkUpdateWorks() {
        //create 1 appointment
        LocalDateTime start1 = LocalDateTime.of(2020, Month.FEBRUARY, 5, 11, 0, 0);
        LocalDateTime end1 = LocalDateTime.of(2020, Month.FEBRUARY, 5, 11, 15, 0);
        Appointment appointment1 = appointmentRepository.save(entityFactory.createAppointment(1, 1, start1, end1));

        //modify
        appointment1.setPatientId(2);
        Appointment updatedAppointment = appointmentRepository.save(appointment1);

        //verify it matchs
        assert(updatedAppointment.getId()).equals(appointment1.getId());
        assert(updatedAppointment.getPatientId()).equals(appointment1.getPatientId());
        assert(updatedAppointment.getPractitionerId()).equals(appointment1.getPractitionerId());
        assert(updatedAppointment.getStartDate()).equals(appointment1.getStartDate());
        assert(updatedAppointment.getEndDate()).equals(appointment1.getEndDate());
    }

    //delete one
    @Test
    void checkDeleteTheCorrectAppointment() {
        //create 2 appointments
        LocalDateTime start1 = LocalDateTime.of(2020, Month.FEBRUARY, 5, 11, 0, 0);
        LocalDateTime end1 = LocalDateTime.of(2020, Month.FEBRUARY, 5, 11, 15, 0);
        LocalDateTime start2 = LocalDateTime.of(2020, Month.FEBRUARY, 5, 8, 0, 0);
        LocalDateTime end2 = LocalDateTime.of(2020, Month.FEBRUARY, 5, 8, 15, 0);
        Appointment appointment1 = appointmentRepository.save(entityFactory.createAppointment(1, 1, start1, end1));
        Appointment appointment2 = appointmentRepository.save(entityFactory.createAppointment(2, 2, start2, end2));

        //delete #1
        appointmentRepository.deleteById(appointment1.getId());

        //verify only #2 remains
        List<Appointment> appointments = appointmentRepository.findAll();
        assertTrue(appointments.size() == 1);
        assert(appointments.get(0).getId()).equals(appointment2.getId());
        assert(appointments.get(0).getPatientId()).equals(appointment2.getPatientId());
        assert(appointments.get(0).getPractitionerId()).equals(appointment2.getPractitionerId());
        assert(appointments.get(0).getStartDate()).equals(appointment2.getStartDate());
        assert(appointments.get(0).getEndDate()).equals(appointment2.getEndDate());

    }

    //delete all
    @Test
    void checkDeleteAll() {
        //create 2 appointments
        LocalDateTime start1 = LocalDateTime.of(2020, Month.FEBRUARY, 5, 11, 0, 0);
        LocalDateTime end1 = LocalDateTime.of(2020, Month.FEBRUARY, 5, 11, 15, 0);
        LocalDateTime start2 = LocalDateTime.of(2020, Month.FEBRUARY, 5, 8, 0, 0);
        LocalDateTime end2 = LocalDateTime.of(2020, Month.FEBRUARY, 5, 8, 15, 0);
        Appointment appointment1 = appointmentRepository.save(entityFactory.createAppointment(1, 1, start1, end1));
        Appointment appointment2 = appointmentRepository.save(entityFactory.createAppointment(2, 2, start2, end2));

        //delete #1
        appointmentRepository.deleteAll();

        //get all
        List<Appointment> appointments = appointmentRepository.findAll();

        //verify no one remains
        assertTrue(appointments.size() == 0);
    }

}
