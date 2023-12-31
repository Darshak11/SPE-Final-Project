package com.auction.auction.controller;
import com.auction.auction.model.Event;
import com.auction.auction.service.EventService;
import com.auction.auction.security.JwtUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@RestController
@CrossOrigin("*")
@RequestMapping("/events")
public class EventController {

    private static final Logger logger= LogManager.getLogger(EventController.class);

    private final EventService eventService;
    private final JwtUtilities jwtUtilities;

    @Autowired
    public EventController(EventService eventService, JwtUtilities jwtUtilities) {
        this.eventService = eventService;
        this.jwtUtilities = jwtUtilities;
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addEvent(@RequestHeader("Authorization") String authHeader, @RequestBody Event newEvent) {
        logger.debug("Add event attempted");
        String token = authHeader.replace("Bearer ", "");
        if (!jwtUtilities.validateToken(token)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String username = jwtUtilities.extractUsername(token);
        Event savedEvent = eventService.createEvent(newEvent, username);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // ...
}