package com.maiia.pro.controller;

import com.maiia.pro.entity.Availability;
import com.maiia.pro.exception.NotImplementedException;
import com.maiia.pro.service.ProAvailabilityService;
import io.swagger.annotations.ApiOperation;
import javassist.bytecode.ByteArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping(value = "/availabilities", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProAvailabilityController {
    @Autowired
    private ProAvailabilityService proAvailabilityService;

    @ApiOperation(value = "Get availabilities by practitionerId")
    @GetMapping("/{practitionerId}")
    public ResponseEntity<List<Availability>> getAvailabilities(@PathVariable final Integer practitionerId, HttpServletResponse response) {
        try {
            return new ResponseEntity<>(proAvailabilityService.generateAvailabilities(practitionerId), HttpStatus.OK);
        }
        catch (NoSuchElementException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

}
