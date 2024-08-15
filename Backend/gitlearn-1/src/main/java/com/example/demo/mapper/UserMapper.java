package com.example.demo.mapper;

import com.example.demo.dto.UserDto;
import com.example.demo.entity.User;

public class UserMapper {

    public static UserDto mapToUserDto(User user) {
        return new UserDto(user.getId(), user.getUsername(), user.getEmail(), user.getPassword());
    }

    public static User mapToUser(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        return user;
    }
}
//This component converts data between the Entity and DTO