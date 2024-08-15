package com.example.demo.service;

import com.example.demo.dto.ReviewDto;

import java.util.List;

public interface ReviewService {
    ReviewDto createReview(Long tourId, ReviewDto reviewDto);
    List<ReviewDto> getReviewsByTourId(Long tourId);
}
