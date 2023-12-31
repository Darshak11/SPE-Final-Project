import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";
// import { withRouter } from "react-router-dom";

const A_Dashboard = ({ onLogout, isLoggedIn }) => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [eventName, setEventName] = useState("");
  const [numTeams, setNumTeams] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [numPlayers, setNumPlayers] = useState("");
  const [playerInfo, setPlayerInfo] = useState({
    playerName: false,
    playerRollNumber: false,
    playerPhoneNumber: false,
    playerEmail: false,
    playerPosition: false,
    playerPic: false,
  });

  const [eve, setEve] = useState([]);

  const handleClick = () => {
    setShowForm(!showForm); // Toggle the showForm state
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEvent = {
      eventName: event.target.elements.eventName.value,
      numTeams: event.target.elements.numTeams.value,
      eventDate: event.target.elements.eventDate.value,
      eventTime: event.target.elements.eventTime.value,
      numPlayers: event.target.elements.numPlayers.value,
      playerName: event.target.elements.playerName.checked,
      playerRollNumber: event.target.elements.playerRollNumber.checked,
      playerPhoneNumber: event.target.elements.playerPhoneNumber.checked,
      playerEmail: event.target.elements.playerEmail.checked,
      playerPosition: event.target.elements.playerPosition.checked,
      playerPic: event.target.elements.playerPic.checked,
    };
    const newEvents = [...events, newEvent];
    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents));
    handleCreateEvent();
    setShowForm(false); // Show the button and hide the form
  };

  const handleLockEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].locked = true;
    setEvents(updatedEvents);
  };

  const handleCreateEvent = async () => {
    const newEvent = {
      name: eventName,
      numTeams,
      eventDate,
      eventTime,
      numPlayers,
      playerInfo,
      locked: false,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/events/add",
        newEvent,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Add the new event to the events state
      setEvents([...events, response.data]);
      console.log(response.data);
    } catch (error) {
      // Handle the error
      console.error("Error:", error);
    }

    // Reset the form fields
    setEventName("");
    setNumTeams("");
    setEventDate("");
    setEventTime("");
    setNumPlayers("");
    setPlayerInfo({
      playerName: false,
      playerRollNumber: false,
      playerPhoneNumber: false,
      playerEmail: false,
      playerPosition: false,
      playerPic: false,
    });
  };

  // const showEvents = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8082/events", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     console.log(response.data);
  //     setEve(response.data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const showEvents = () => {
    // Here, you can simply use the 'events' state variable
    // because it already holds all the events
    setEve(events);
  };

  return (
    <div className="events ">
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main>
        <div className="formi">
          <br />
          {!showForm && (
            <Button onClick={handleClick} className="mb-3">
              Create Event
            </Button>
          )}

          {showForm && (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Event Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="eventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Number of Teams:</Form.Label>
                <Form.Control
                  type="number"
                  name="numTeams"
                  value={numTeams}
                  onChange={(e) => setNumTeams(e.target.value)}
                  min="0"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Event Date:</Form.Label>
                <Form.Control
                  type="date"
                  name="eventDate"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Event Time:</Form.Label>
                <Form.Control
                  type="time"
                  name="eventTime"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Number of Players per Team:</Form.Label>
                <Form.Control
                  type="number"
                  name="numPlayers"
                  value={numPlayers}
                  onChange={(e) => setNumPlayers(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Player Information Required:</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Player Name"
                  name="playerName"
                  checked={playerInfo.playerName}
                  onChange={(e) =>
                    setPlayerInfo({
                      ...playerInfo,
                      playerName: e.target.checked,
                    })
                  }
                />
                <Form.Check
                  type="checkbox"
                  label="Player Roll Number"
                  name="playerRollNumber"
                  checked={playerInfo.playerRollNumber}
                  onChange={(e) =>
                    setPlayerInfo({
                      ...playerInfo,
                      playerRollNumber: e.target.checked,
                    })
                  }
                />
                <Form.Check
                  type="checkbox"
                  label="Player Phone Number"
                  name="playerPhoneNumber"
                  checked={playerInfo.playerPhoneNumber}
                  onChange={(e) =>
                    setPlayerInfo({
                      ...playerInfo,
                      playerPhoneNumber: e.target.checked,
                    })
                  }
                />
                <Form.Check
                  type="checkbox"
                  label="Player Email"
                  name="playerEmail"
                  checked={playerInfo.playerEmail}
                  onChange={(e) =>
                    setPlayerInfo({
                      ...playerInfo,
                      playerEmail: e.target.checked,
                    })
                  }
                />
                <Form.Check
                  type="checkbox"
                  label="Player Position"
                  name="playerPosition"
                  checked={playerInfo.playerPosition}
                  onChange={(e) =>
                    setPlayerInfo({
                      ...playerInfo,
                      playerPosition: e.target.checked,
                    })
                  }
                />
                <Form.Check
                  type="checkbox"
                  label="Player Picture"
                  name="playerPic"
                  checked={playerInfo.playerPic}
                  onChange={(e) =>
                    setPlayerInfo({
                      ...playerInfo,
                      playerPic: e.target.checked,
                    })
                  }
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
          <br />

          <div className="eventContent">
            <Button variant="primary" onClick={showEvents}>
              Show all Events
            </Button>
          </div>
        </div>
        <div className="card-container">
          {eve.map((event, index) => (
            <Card
              key={index}
              className="card-center"
              style={{ width: "18rem" }}
            >
              <Card.Body>
                <Card.Title>{event.eventName}</Card.Title>
                <Card.Text>
                  Number of Teams: {event.numTeams}
                  <br />
                  Event Date: {event.eventDate}
                  <br />
                  Event Time: {event.eventTime}
                  <br />
                  Number of Players per Team: {event.numPlayers}
                  <br />
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
          <br />
        </div>
      </main>
    </div>
  );
};

export default A_Dashboard;

// create event

// new form
// event information: event name, number of teams, event Date, event Time, number of players per team, player information required.
