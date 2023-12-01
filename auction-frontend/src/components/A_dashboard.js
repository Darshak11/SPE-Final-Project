import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Form, Button } from "react-bootstrap";
// import { withRouter } from "react-router-dom";

const A_Dashboard = ({ onLogout, isLoggedIn }) => {
  const navigate = useNavigate();
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState("");
  const availableSports = ["Football", "Basketball", "Tennis", "Cricket"];
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSportSelection = (event) => {
    setSelectedSport(event.target.value);
  };

  const handleClick = () => {
    setShowForm(!showForm); // Toggle the showForm state
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission...
    setShowForm(false); // Show the button and hide the form
  }

  const handleAddSport = () => {
    if (!sports.includes(selectedSport) && selectedSport) {
      setSports([...sports, selectedSport]);
    }
    setSelectedSport("");
  };

  const handleDeleteSport = (sport) => {
    const updatedSports = sports.filter((item) => item !== sport);
    setSports(updatedSports);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const SportsList = () => (
    <ul className="list-group">
      {sports.map((sport, index) => (
        <li
          key={index}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>{sport}</span>
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteSport(sport)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );

  const SportSelection = () => (
    <div className="input-group mt-3">
      <select
        className="form-control"
        value={selectedSport}
        onChange={handleSportSelection}
      >
        <option value="">Select a sport</option>
        {availableSports.map((sport, index) => (
          <option key={index} value={sport}>
            {sport}
          </option>
        ))}
      </select>
      <div className="input-group-append">
        <button className="btn btn-success" onClick={handleAddSport}>
          Add Sport
        </button>
      </div>
    </div>
  );

  const handleLockEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].locked = true;
    setEvents(updatedEvents);
  };

  const handleCreateEvent = () => {
    setEvents([...events, { name: eventName, sports, locked: false }]);
    setSports([]);
    setEventName("");
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
                <Form.Control type="text" name="eventName" required/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Number of Teams:</Form.Label>
                <Form.Control type="number" name="numTeams" min="0" required/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Event Date:</Form.Label>
                <Form.Control type="date" name="eventDate" required/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Event Time:</Form.Label>
                <Form.Control type="time" name="eventTime" required/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Number of Players per Team:</Form.Label>
                <Form.Control type="number" name="numPlayers" required/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Player Information Required:</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Player Name"
                  name="playerName"
                />
                <Form.Check
                  type="checkbox"
                  label="Player Roll Number"
                  name="playerRollNumber"
                />
                <Form.Check
                  type="checkbox"
                  label="Player Phone Number"
                  name="playerPhoneNumber"
                />
                <Form.Check
                  type="checkbox"
                  label="Player Email ID"
                  name="playerEmail"
                />
                <Form.Check
                  type="checkbox"
                  label="Player Position"
                  name="playerPosition"
                />
                <Form.Check
                  type="checkbox"
                  label="Player Pic"
                  name="playerPic"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
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
