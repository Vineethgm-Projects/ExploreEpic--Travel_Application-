package com.example.demo.service;

import com.example.demo.dto.DestinationDto;

import java.util.List;

public interface DestinationService {
    DestinationDto createDestination(DestinationDto destinationDto);
    List<DestinationDto> getDestinationsByTourId(Long tourId);
}
