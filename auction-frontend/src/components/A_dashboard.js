import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
// import { withRouter } from "react-router-dom";

const A_Dashboard = ({ onLogout, isLoggedIn }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
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
  const [showForm, setShowForm] = useState(false);


  const handleClick = () => {
    setShowForm(!showForm); // Toggle the showForm state
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateEvent();
    setShowForm(false); // Show the button and hide the form
  }


  

  const handleLogout = () => {
    onLogout();
    localStorage.removeItem('token');
    navigate("/login");
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
      const response = await axios.post('http://localhost:8080/events/add', newEvent, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      // Add the new event to the events state
      setEvents([...events, response.data]);
      console.log(response.data)
    } catch (error) {
      // Handle the error
      console.error('Error:', error);
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

  return (
    <div className="container-fluid">
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main>
      <div className="input-group mt-3">
          {!showForm && (
            <Button onClick={handleClick} className="mb-3">Create Event</Button>
          )}
          {showForm && (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Event Name:</Form.Label>
                <Form.Control type="text" name="eventName" value={eventName} onChange={e => setEventName(e.target.value)} required/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Number of Teams:</Form.Label>
                <Form.Control type="number" name="numTeams" value={numTeams} onChange={e => setNumTeams(e.target.value)} min="0" required/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Event Date:</Form.Label>
                <Form.Control type="date" name="eventDate" value={eventDate} onChange={e => setEventDate(e.target.value)} required/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Event Time:</Form.Label>
                <Form.Control type="time" name="eventTime" value={eventTime} onChange={e => setEventTime(e.target.value)} required/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Number of Players per Team:</Form.Label>
                <Form.Control type="number" name="numPlayers" value={numPlayers} onChange={e => setNumPlayers(e.target.value)} required/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Player Information Required:</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Player Name"
                  name="playerName"
                  checked={playerInfo.playerName}
                  onChange={e => setPlayerInfo({ ...playerInfo, playerName: e.target.checked })}
                />
                <Form.Check
                  type="checkbox"
                  label="Player Roll Number"
                  name="playerRollNumber"
                  checked={playerInfo.playerRollNumber}
                  onChange={e => setPlayerInfo({ ...playerInfo, playerRollNumber: e.target.checked })}
                />
                <Form.Check
                  type="checkbox"
                  label="Player Phone Number"
                  name="playerPhoneNumber"
                  checked={playerInfo.playerPhoneNumber}
                  onChange={e => setPlayerInfo({ ...playerInfo, playerPhoneNumber: e.target.checked })}
                />
                <Form.Check
                  type="checkbox"
                  label="Player Email"
                  name="playerEmail"
                  checked={playerInfo.playerEmail}
                  onChange={e => setPlayerInfo({ ...playerInfo, playerEmail: e.target.checked })}
                />
                <Form.Check
                  type="checkbox"
                  label="Player Position"
                  name="playerPosition"
                  checked={playerInfo.playerPosition}
                  onChange={e => setPlayerInfo({ ...playerInfo, playerPosition: e.target.checked })}
                />
                <Form.Check
                  type="checkbox"
                  label="Player Picture"
                  name="playerPic"
                  checked={playerInfo.playerPic}
                  onChange={e => setPlayerInfo({ ...playerInfo, playerPic: e.target.checked })}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Create Event
              </Button>
            </Form>
          )}
        </div>
      </main>
    </div>
  );
};

export default A_Dashboard;

// create event

// new form
// event information: event name, number of teams, event Date, event Time, number of players per team, player information required.
