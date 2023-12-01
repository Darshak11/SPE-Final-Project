package com.auction.auction.service;

import com.auction.auction.model.Event;
import com.auction.auction.model.User;
import com.auction.auction.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final UserDetailsServiceImpl userService;

    @Autowired
    public EventService(EventRepository eventRepository, UserDetailsServiceImpl userService) {
        this.eventRepository = eventRepository;
        this.userService = userService;
    }

    public Event createEvent(Event event, String username) {
        User user = userService.findByUsername(username);
        event.setUser(user);
        return eventRepository.save(event);
    }

    public List<Event> getEventsByUserId(Long userId) {
        // Assuming User has a field events
        return userService.findById(userId).getEvents();
    }
}
