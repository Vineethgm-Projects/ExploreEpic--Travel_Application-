package com.example.demo.service;

import com.example.demo.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto);
    UserDto getUserById(Long userId);
    UserDto getUserByUsername(String username);
    UserDto getUserByEmail(String email);
    List<UserDto> getAllUsers();
    void deleteUser(Long userId);
    UserDto authenticateUser(UserDto userDto); // Add this method
}
