package com.auction.auction.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/superadmin")
@RequiredArgsConstructor
public class Superadmincontroller {


    @GetMapping("/hi")
    public String sayHi ()
    { return "Hi" ;}


}
