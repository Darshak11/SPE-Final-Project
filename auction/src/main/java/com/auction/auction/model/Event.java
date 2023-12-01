package com.auction.auction.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Map;

@Entity
@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "name")
    private String name;

    @Column(name = "num_teams")
    private int numTeams;

    @Column(name = "event_date")
    private LocalDate eventDate;

    @Column(name = "event_time")
    private LocalTime eventTime;

    @Column(name = "num_players")
    private int numPlayers;

    @ElementCollection
    @CollectionTable(name = "player_info", joinColumns = @JoinColumn(name = "event_id"))
    @MapKeyColumn(name = "info_type")
    @Column(name = "required")
    private Map<String, Boolean> playerInfo;

    @Column(name = "locked")
    private boolean locked;

}