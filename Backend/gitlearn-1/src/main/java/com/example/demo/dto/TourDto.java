package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TourDto {
    private Long id;
    private String title;
    private String location;
    private Double price;
    private Integer duration;
    private Integer people;
    private Double rating;
    private Boolean featured;
    private String image;
    private String image1;
    private String image2;    
    private String ageRange;
    private String liveGuide;
    private String category;
    private String description;
    private List<ReviewDto> reviews; // Add this line
}