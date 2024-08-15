package com.example.demo.mapper;

import java.util.stream.Collectors;

import com.example.demo.dto.TourDto;
import com.example.demo.entity.Tour;

public class TourMapper {

    public static TourDto mapToTourDto(Tour tour) {
        return new TourDto(
                tour.getId(),
                tour.getTitle(),
                tour.getLocation(),
                tour.getPrice(),
                tour.getDuration(),
                tour.getPeople(),
                tour.getRating(),
                tour.getFeatured(),
                tour.getImage(),
                tour.getImage1(),
                tour.getImage2(),
                tour.getAgeRange(),
                tour.getLiveGuide(),
                tour.getCategory(),
                tour.getDescription(),
                tour.getReviews().stream().map(ReviewMapper::mapToReviewDto).collect(Collectors.toList()) // Add this line
        );
    }

    public static Tour mapToTour(TourDto tourDto) {
        return new Tour(
                tourDto.getId(),
                tourDto.getTitle(),
                tourDto.getLocation(),
                tourDto.getPrice(),
                tourDto.getDuration(),
                tourDto.getPeople(),
                tourDto.getRating(),
                tourDto.getFeatured(),
                tourDto.getImage(),
                tourDto.getImage1(),
                tourDto.getImage2(),
                tourDto.getAgeRange(),
                tourDto.getLiveGuide(),
                tourDto.getCategory(),
                tourDto.getDescription(),
                tourDto.getReviews().stream().map(ReviewMapper::mapToReview).collect(Collectors.toList()) // Add this line
        );
    }
}