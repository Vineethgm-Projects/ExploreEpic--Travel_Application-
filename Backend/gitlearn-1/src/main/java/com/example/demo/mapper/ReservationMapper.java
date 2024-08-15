package com.example.demo.mapper;

import com.example.demo.dto.ReservationDto;
import com.example.demo.entity.Reservation;

public class ReservationMapper {

    public static ReservationDto mapToReservationDto(Reservation reservation) {
        return new ReservationDto(
                reservation.getId(),
                reservation.getDateFrom(),
                reservation.getNumberOfMembers(),
                reservation.getAmount(),
                reservation.getTour().getId(),
                reservation.getUserId()
        );
    }

    public static Reservation mapToReservation(ReservationDto reservationDto) {
        return new Reservation(
                reservationDto.getId(),
                reservationDto.getDateFrom(),
                reservationDto.getNumberOfMembers(),
                reservationDto.getAmount(),
                null,  // Tour will be set later
                reservationDto.getUserId()
        );
    }
}
