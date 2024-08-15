package com.example.demo.controller;

import com.example.demo.dto.UserDto;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
// it would process login requests from the client.
@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
@CrossOrigin("*")
public class UserController {

    private final UserService userService;
//post the values of the user
    @PostMapping("/signup")
    public ResponseEntity<UserDto> signUp(@RequestBody UserDto userDto) {
        UserDto newUser = userService.createUser(userDto);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody UserDto userDto) {
        try {
            UserDto authenticatedUser = userService.authenticateUser(userDto);
            return ResponseEntity.ok(authenticatedUser);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
//get the user values from database to verify login
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        UserDto userDto = userService.getUserById(id);
        return ResponseEntity.ok(userDto);
    }
//get by username
    @GetMapping("/username/{username}")
    public ResponseEntity<UserDto> getUserByUsername(@PathVariable String username) {
        UserDto userDto = userService.getUserByUsername(username);
        return ResponseEntity.ok(userDto);
    }
//get by email
    @GetMapping("/email/{email}")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable String email) {
        UserDto userDto = userService.getUserByEmail(email);
        return ResponseEntity.ok(userDto);
    }
//delete values
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully!");
    }
}
