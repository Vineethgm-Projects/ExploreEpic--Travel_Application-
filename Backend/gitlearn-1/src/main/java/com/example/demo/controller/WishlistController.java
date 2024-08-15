package com.example.demo.controller;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.WishlistDto;
import com.example.demo.service.WishlistService;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;
//add the wishlist of a user to database
    @PostMapping
    public ResponseEntity<WishlistDto> addToWishlist(@RequestBody WishlistDto wishlistDto) {
        if (wishlistDto.getUserId() == null || wishlistDto.getTourId() == null) {
            return ResponseEntity.badRequest().body(null); // Respond with a bad request status
        }
        
        WishlistDto newWishlistItem = wishlistService.addToWishlist(wishlistDto);
        return new ResponseEntity<>(newWishlistItem, HttpStatus.CREATED);
    }
//get get wishlist of a particular user to display
    @GetMapping("/{userId}")
    public ResponseEntity<List<WishlistDto>> getUserWishlist(@PathVariable Long userId) {
        List<WishlistDto> wishlist = wishlistService.getUserWishlist(userId);
        return ResponseEntity.ok(wishlist);
    }
//to delete the wishlist
    @DeleteMapping("/{wishlistId}")
    public ResponseEntity<String> removeFromWishlist(@PathVariable Long wishlistId) {
        wishlistService.removeFromWishlist(wishlistId);
        return ResponseEntity.ok("Item removed from wishlist successfully!");
    }
}

