package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDto {
    private Long id;
    private String dateFrom;
    private Integer numberOfMembers;
    private Double amount;
    private Long tourId;
    private String userId;
}
