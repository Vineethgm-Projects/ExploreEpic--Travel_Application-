package com.example.demo.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ReviewDto;
import com.example.demo.entity.Review;
import com.example.demo.entity.Tour;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.ReviewMapper;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.repository.TourRepository;
import com.example.demo.service.ReviewService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final TourRepository tourRepository;

    //to add the user review
    @Override
    public ReviewDto createReview(Long tourId, ReviewDto reviewDto) {
        Tour tour = tourRepository.findById(tourId).orElseThrow(
                () -> new ResourceNotFoundException("Tour not found with id: " + tourId)
        );
        Review review = ReviewMapper.mapToReview(reviewDto);
        review.setTour(tour);
        Review savedReview = reviewRepository.save(review);
        return ReviewMapper.mapToReviewDto(savedReview);
    }
//to fetch and display the reviews
    @Override
    public List<ReviewDto> getReviewsByTourId(Long tourId) {
        List<Review> reviews = reviewRepository.findByTourId(tourId);
        return reviews.stream().map(ReviewMapper::mapToReviewDto).collect(Collectors.toList());
    }
}
