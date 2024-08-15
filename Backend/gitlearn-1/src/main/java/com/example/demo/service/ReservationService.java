package com.example.demo.service;

import com.example.demo.dto.ReservationDto;
import java.util.List;

public interface ReservationService {
    ReservationDto createReservation(ReservationDto reservationDto);
    List<ReservationDto> getReservationsByUserId(String userId);
}
