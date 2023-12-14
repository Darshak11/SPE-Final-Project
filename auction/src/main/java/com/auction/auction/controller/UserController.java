package com.auction.auction.controller;

import com.auction.auction.dto.LoginDto;
import com.auction.auction.dto.RegisterDto;
import com.auction.auction.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserDetailsServiceImpl userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody RegisterDto registerDto) {
        return userService.signup(registerDto);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginDto loginDto) {
        return userService.login(loginDto);
    }
}