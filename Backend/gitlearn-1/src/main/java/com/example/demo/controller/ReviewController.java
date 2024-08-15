package com.example.demo.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.ReviewDto;
import com.example.demo.service.ReviewService;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    // Create or Add Review REST API
    @PostMapping("/{tourId}")
    public ResponseEntity<ReviewDto> createReview(@PathVariable("tourId") Long tourId, @RequestBody ReviewDto reviewDto) {
        ReviewDto newReview = reviewService.createReview(tourId, reviewDto);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED);
    }

    // Get Reviews By Tour ID REST API
    @GetMapping("/{tourId}")
    public ResponseEntity<List<ReviewDto>> getReviewsByTourId(@PathVariable("tourId") Long tourId) {
        List<ReviewDto> reviews = reviewService.getReviewsByTourId(tourId);
        return ResponseEntity.ok(reviews);
    }
}
