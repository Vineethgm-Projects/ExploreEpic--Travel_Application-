package com.example.demo.mapper;

import com.example.demo.dto.WishlistDto;
import com.example.demo.entity.Wishlist;

public class WishlistMapper {
    public static WishlistDto mapToWishlistDto(Wishlist wishlist) {
        return new WishlistDto(
                wishlist.getId(),
                wishlist.getUser().getId(),
                wishlist.getTour().getId()
        );
    }
}

