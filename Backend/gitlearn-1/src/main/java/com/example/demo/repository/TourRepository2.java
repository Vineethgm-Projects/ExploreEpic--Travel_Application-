package com.example.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Tour;

public interface TourRepository2 extends JpaRepository<Tour, Long> {
}
