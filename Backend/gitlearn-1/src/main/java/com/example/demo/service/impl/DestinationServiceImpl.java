package com.example.demo.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.demo.dto.DestinationDto;
import com.example.demo.entity.Destination;
import com.example.demo.entity.Tour;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.DestinationMapper;
import com.example.demo.repository.DestinationRepository;
import com.example.demo.repository.TourRepository;
import com.example.demo.service.DestinationService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DestinationServiceImpl implements DestinationService {

    private final DestinationRepository destinationRepository;
    private final TourRepository tourRepository;

    @Override
    public DestinationDto createDestination(DestinationDto destinationDto) {
        Tour tour = tourRepository.findById(destinationDto.getTourId())
                .orElseThrow(() -> new ResourceNotFoundException("Tour not found with id: " + destinationDto.getTourId()));
        Destination destination = DestinationMapper.mapToDestination(destinationDto, tour);
        Destination savedDestination = destinationRepository.save(destination);
        return DestinationMapper.mapToDestinationDto(savedDestination);
    }

    @Override
    public List<DestinationDto> getDestinationsByTourId(Long tourId) {
        List<Destination> destinations = destinationRepository.findByTourId(tourId);
        return destinations.stream()
                .map(DestinationMapper::mapToDestinationDto)
                .collect(Collectors.toList());
    }
}
