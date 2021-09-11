package com.maiia.pro.controller;

import com.maiia.pro.entity.Appointment;
import com.maiia.pro.service.ProAppointmentService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping(value = "/appointments", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProAppointmentController {
    @Autowired
    private ProAppointmentService proAppointmentService;

    @ApiOperation(value = "Get appointments by practitionerId")
    @GetMapping("/{practitionerId}")
    public List<Appointment> getAppointmentsByPractitioner(@PathVariable final Integer practitionerId) {
        return proAppointmentService.findByPractitionerId(practitionerId);
    }

    @ApiOperation(value = "Get all appointments")
    @GetMapping
    public List<Appointment> getAppointments() {
        return proAppointmentService.findAll();
    }

    @ApiOperation(value = "get an appointments")
    @GetMapping("/{appointmentId")
    public ResponseEntity<Appointment> getAppointment(@PathVariable final Integer appointmentId) {
        try {
            return new ResponseEntity<>(proAppointmentService.find(appointmentId), HttpStatus.OK);
        }
        catch (NoSuchElementException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation(value = "Post an appointment")
    @PostMapping( consumes = MediaType.APPLICATION_JSON_VALUE)
    public Appointment postAppointment(@RequestBody Appointment appointment) {
        return proAppointmentService.save(appointment);
    }

    @ApiOperation(value = "Delete all appointments")
    @DeleteMapping
    public void deleteAppointments() {
        proAppointmentService.deleteAll();
    }

    @ApiOperation(value = "Delete an appointment")
    @DeleteMapping("/{appointmentId")
    public void deleteAppointment(@PathVariable final Integer appointmentId) {
        proAppointmentService.delete(appointmentId);
    }


}
