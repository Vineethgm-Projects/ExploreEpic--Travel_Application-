package com.example.demo.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.demo.dto.UserDto;
import com.example.demo.entity.User;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;

import java.util.List;
import java.util.stream.Collectors;
//It defines how the methods declared in the service interface are carried out
@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    //to add uservalues
    @Override
    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.mapToUser(userDto);
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    //to get uservalues by filter of id
    @Override
    public UserDto getUserById(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User not found with id: " + userId)
        );
        return UserMapper.mapToUserDto(user);
    }

    //to get by usename
    @Override
    public UserDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResourceNotFoundException("User not found with username: " + username);
        }
        return UserMapper.mapToUserDto(user);
    }

    //to get by email
    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new ResourceNotFoundException("User not found with email: " + email);
        }
        return UserMapper.mapToUserDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(UserMapper::mapToUserDto).collect(Collectors.toList());
    }

    //to delete the user
    @Override
    public void deleteUser(Long userId) {
        userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User not found with id: " + userId)
        );
        userRepository.deleteById(userId);
    }

    @Override
    public UserDto authenticateUser(UserDto userDto) {
        User user = userRepository.findByUsername(userDto.getUsername());
        if (user != null && user.getPassword().equals(userDto.getPassword())) {
            return UserMapper.mapToUserDto(user);
        } else {
            throw new ResourceNotFoundException("Invalid username or password");
        }
    }
}
