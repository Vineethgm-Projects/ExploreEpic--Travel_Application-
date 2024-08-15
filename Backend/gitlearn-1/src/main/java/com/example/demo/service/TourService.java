package com.example.demo.service;

import com.example.demo.dto.TourDto;

import java.util.List;

public interface TourService {
    TourDto createTour(TourDto tourDto);
    TourDto getTourById(Long tourId);
    List<TourDto> getAllTours();
    void deleteTour(Long tourId);
}
