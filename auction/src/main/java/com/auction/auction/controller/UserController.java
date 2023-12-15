package com.auction.auction.controller;

import com.auction.auction.dto.LoginDto;
import com.auction.auction.dto.RegisterDto;
import com.auction.auction.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {

    private static final Logger logger= LogManager.getLogger(UserController.class);

    @Autowired
    private UserDetailsServiceImpl userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody RegisterDto registerDto) {
        logger.debug("Signup attempted");
        return userService.signup(registerDto);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginDto loginDto) {
        logger.debug("Login attempted");
        return userService.login(loginDto);
    }
}