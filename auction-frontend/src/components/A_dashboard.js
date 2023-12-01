import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Navbar } from "./Navbar";
// import { withRouter } from "react-router-dom";

const A_Dashboard = ({onLogout, isLoggedIn}) => {
  const navigate = useNavigate();
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState("");
  const availableSports = ["Football", "Basketball", "Tennis", "Cricket"];
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");

  const handleSportSelection = (event) => {
    setSelectedSport(event.target.value);
  };

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
    navigate("/login")
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
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout}/>
      <main>
        <h2>List of Sports</h2>
        <SportsList />
        <SportSelection />
        <div className="input-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={handleCreateEvent}>
              Create Event
            </button>
          </div>
        </div>
        <div className="events row">
          {events.map((event, index) => (
            <div key={index} className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <div className="card">
                <div className="card-header">
                  <h3>{event.name}</h3>
                </div>
                <ul className="list-group list-group-flush">
                  {event.sports.map((sport, i) => (
                    <li key={i} className="list-group-item">
                      {sport}
                    </li>
                  ))}
                </ul>
                <div className="card-body">
                  {!event.locked && (
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleLockEvent(index)}
                    >
                      Lock Event
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default A_Dashboard;
