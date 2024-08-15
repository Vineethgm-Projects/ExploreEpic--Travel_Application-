package com.example.demo.controller;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.ReservationDto;
import com.example.demo.service.ReservationService;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;
//POst the reserved data to the table
    @PostMapping
    public ResponseEntity<ReservationDto> createReservation(@RequestBody ReservationDto reservationDto) {
        ReservationDto newReservation = reservationService.createReservation(reservationDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newReservation);
    }
//get the reserved data from database to show
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReservationDto>> getReservationsByUserId(@PathVariable String userId) {
        List<ReservationDto> reservations = reservationService.getReservationsByUserId(userId);
        return ResponseEntity.ok(reservations);
    }
}
