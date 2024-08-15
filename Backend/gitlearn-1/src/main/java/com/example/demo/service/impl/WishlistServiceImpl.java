package com.example.demo.service.impl;




import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.demo.dto.WishlistDto;
import com.example.demo.entity.Tour;
import com.example.demo.entity.User;
import com.example.demo.entity.Wishlist;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.WishlistMapper;
import com.example.demo.repository.TourRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.WishlistRepository;
import com.example.demo.service.WishlistService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final TourRepository tourRepository;

    
    //add the details to wishlist 
    @Override
    public WishlistDto addToWishlist(WishlistDto wishlistDto) {
        if (wishlistDto.getUserId() == null || wishlistDto.getTourId() == null) {
            throw new IllegalArgumentException("User ID and Tour ID must not be null");
        }
        
        User user = userRepository.findById(wishlistDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + wishlistDto.getUserId()));
        Tour tour = tourRepository.findById(wishlistDto.getTourId())
                .orElseThrow(() -> new ResourceNotFoundException("Tour not found with id: " + wishlistDto.getTourId()));

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        wishlist.setTour(tour);

        Wishlist savedWishlist = wishlistRepository.save(wishlist);
        return WishlistMapper.mapToWishlistDto(savedWishlist);
    }

    
    //to get the wishlist data
    @Override
    public List<WishlistDto> getUserWishlist(Long userId) {
        return wishlistRepository.findByUserId(userId).stream()
                .map(WishlistMapper::mapToWishlistDto)
                .collect(Collectors.toList());
    }

    @Override
    public void removeFromWishlist(Long wishlistId) {
        Wishlist wishlist = wishlistRepository.findById(wishlistId)
                .orElseThrow(() -> new ResourceNotFoundException("Wishlist item not found with id: " + wishlistId));
        wishlistRepository.delete(wishlist);
    }
}
