package com.maiia.pro.repository;

import com.maiia.pro.entity.Appointment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Integer> {
    List<Appointment> findByPractitionerId(Integer practitionerId);
    List<Appointment> findAll();
    void deleteAll();
}
