package com.maiia.pro.controller;

import com.maiia.pro.entity.Practitioner;
import com.maiia.pro.entity.TimeSlot;
import com.maiia.pro.service.ProPractitionerService;
import com.maiia.pro.service.ProTimeSlotService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/timeslots", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProTimeSlotController {
    @Autowired
    private ProTimeSlotService proTimeSlotService;

    @ApiOperation(value = "Get timeslots")
    @GetMapping
    public List<TimeSlot> getTimeSlots() {
        return proTimeSlotService.findAll();
    }
}
