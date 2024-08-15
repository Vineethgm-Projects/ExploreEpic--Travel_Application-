package com.example.demo.controller;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.TourDto;
import com.example.demo.service.TourService;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/tours")
public class TourController {

    private final TourService tourService;

    // Create or Add Tour REST API
    @PostMapping
    public ResponseEntity<TourDto> createTour(@RequestBody TourDto tourDto) {
        TourDto newTour = tourService.createTour(tourDto);
        return new ResponseEntity<>(newTour, HttpStatus.CREATED);
    }

    // Get Tour By ID REST API
    @GetMapping("/{id}")
    public ResponseEntity<TourDto> getTourById(@PathVariable("id") Long tourId) {
        TourDto tourDto = tourService.getTourById(tourId);
        return ResponseEntity.ok(tourDto);
    }

    // Get All Tours REST API
    @GetMapping
    public ResponseEntity<List<TourDto>> getAllTours() {
        List<TourDto> tours = tourService.getAllTours();
        return ResponseEntity.ok(tours);
    }

    // Delete Tour REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTour(@PathVariable("id") Long tourId) {
        tourService.deleteTour(tourId);
        return ResponseEntity.ok("Tour deleted successfully!");
    }
}
