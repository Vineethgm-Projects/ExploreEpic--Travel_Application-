package com.example.demo.mapper;

import com.example.demo.dto.DestinationDto;
import com.example.demo.entity.Destination;
import com.example.demo.entity.Tour;

public class DestinationMapper {

    public static DestinationDto mapToDestinationDto(Destination destination) {
        return new DestinationDto(
                destination.getId(),
                destination.getName(),
                destination.getDescription(),
                destination.getTour().getId() // Extract tourId from the Tour entity
        );
    }

    public static Destination mapToDestination(DestinationDto destinationDto, Tour tour) {
        return new Destination(
                destinationDto.getId(),
                destinationDto.getName(),
                destinationDto.getDescription(),
                tour // Link the Destination with a Tour entity
        );
    }
}
