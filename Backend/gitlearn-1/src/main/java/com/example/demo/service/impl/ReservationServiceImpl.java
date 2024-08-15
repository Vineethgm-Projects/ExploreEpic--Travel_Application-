package com.example.demo.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.demo.dto.ReservationDto;
import com.example.demo.entity.Reservation;
import com.example.demo.entity.Tour;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.ReservationMapper;
import com.example.demo.repository.ReservationRepository;
import com.example.demo.repository.TourRepository;
import com.example.demo.service.ReservationService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final TourRepository tourRepository;

    //to add values of reservation to the database
    @Override
    public ReservationDto createReservation(ReservationDto reservationDto) {
        Tour tour = tourRepository.findById(reservationDto.getTourId()).orElseThrow(
                () -> new ResourceNotFoundException("Tour not found with id: " + reservationDto.getTourId())
        );

        Reservation reservation = ReservationMapper.mapToReservation(reservationDto);
        reservation.setTour(tour);
        Reservation savedReservation = reservationRepository.save(reservation);

        return ReservationMapper.mapToReservationDto(savedReservation);
    }
//get the reservation details
    @Override
    public List<ReservationDto> getReservationsByUserId(String userId) {
        List<Reservation> reservations = reservationRepository.findByUserId(userId);
        return reservations.stream().map(ReservationMapper::mapToReservationDto).collect(Collectors.toList());
    }
}
