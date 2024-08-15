package com.example.demo.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.demo.dto.TourDto;
import com.example.demo.entity.Tour;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.TourMapper;
import com.example.demo.repository.TourRepository;
import com.example.demo.service.TourService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TourServiceImpl implements TourService {

    private final TourRepository tourRepository;

    
   //to add tour pacakage details
    @Override
    public TourDto createTour(TourDto tourDto) {
        Tour tour = TourMapper.mapToTour(tourDto);
        Tour savedTour = tourRepository.save(tour);
        return TourMapper.mapToTourDto(savedTour);
    }
//to get and display tour pacakge details
    @Override
    public TourDto getTourById(Long tourId) {
        Tour tour = tourRepository.findById(tourId).orElseThrow(
                () -> new ResourceNotFoundException("Tour not found with id: " + tourId)
        );
        return TourMapper.mapToTourDto(tour);
    }

    @Override
    public List<TourDto> getAllTours() {
        List<Tour> tours = tourRepository.findAll();
        return tours.stream().map(TourMapper::mapToTourDto).collect(Collectors.toList());
    }

    //to delete the tour details
    @Override
    public void deleteTour(Long tourId) {
        tourRepository.findById(tourId).orElseThrow(
                () -> new ResourceNotFoundException("Tour not found with id: " + tourId)
        );
        tourRepository.deleteById(tourId);
    }
}
