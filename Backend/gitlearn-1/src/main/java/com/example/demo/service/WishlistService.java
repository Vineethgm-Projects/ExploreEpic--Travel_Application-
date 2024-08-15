package com.example.demo.service;



import java.util.List;

import com.example.demo.dto.WishlistDto;

public interface WishlistService {
    WishlistDto addToWishlist(WishlistDto wishlistDto);
    List<WishlistDto> getUserWishlist(Long userId);
    void removeFromWishlist(Long wishlistId);
}
