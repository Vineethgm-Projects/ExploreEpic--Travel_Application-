package com.example.demo.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.DestinationDto;
import com.example.demo.service.DestinationService;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/destinations")
public class DestinationController {

    private final DestinationService destinationService;

    // Create or Add Destination REST API
    @PostMapping
    public ResponseEntity<DestinationDto> createDestination(@RequestBody DestinationDto destinationDto) {
        DestinationDto newDestination = destinationService.createDestination(destinationDto);
        return new ResponseEntity<>(newDestination, HttpStatus.CREATED);
    }

    // Get Destinations By Tour ID REST API
    @GetMapping("/tour/{tourId}")
    public ResponseEntity<List<DestinationDto>> getDestinationsByTourId(@PathVariable("tourId") Long tourId) {
        List<DestinationDto> destinations = destinationService.getDestinationsByTourId(tourId);
        return ResponseEntity.ok(destinations);
    }
}
