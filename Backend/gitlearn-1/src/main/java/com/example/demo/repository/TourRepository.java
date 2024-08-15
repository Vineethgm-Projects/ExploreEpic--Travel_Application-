package com.example.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Tour;

public interface TourRepository extends JpaRepository<Tour, Long> {
}
