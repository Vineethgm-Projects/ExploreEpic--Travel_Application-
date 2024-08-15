package com.example.demo.mapper;

import com.example.demo.dto.ReviewDto;
import com.example.demo.entity.Review;

public class ReviewMapper {

    public static ReviewDto mapToReviewDto(Review review) {
        return new ReviewDto(
                review.getId(),
                review.getName(),
                review.getRating(),
                review.getComment(),
                review.getDate()
        );
    }

    public static Review mapToReview(ReviewDto reviewDto) {
        return new Review(
                reviewDto.getId(),
                reviewDto.getName(),
                reviewDto.getRating(),
                reviewDto.getComment(),
                reviewDto.getDate(),
                null
        );
    }
}
