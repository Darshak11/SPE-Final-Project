import React, { useState } from 'react';

const Dashboard = () => {
  const [sports, setSports] = useState([]);
  const [newSport, setNewSport] = useState('');

  const handleAddSport = () => {
    if (newSport.trim() !== '') {
      setSports([...sports, newSport]);
      setNewSport('');
    }
  };

  const handleDeleteSport = (sport) => {
    const updatedSports = sports.filter((item) => item !== sport);
    setSports(updatedSports);
  };

  const handleLogout = () => {
    // Implement your logout logic here
  };

  return (
    <div>
      <nav>
        <div>
          <h1>Auctioneer Dashboard</h1>
        </div>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <main>
        <h2>List of Sports</h2>
        <ul>
          {sports.map((sport, index) => (
            <li key={index}>
              {sport}
              <button onClick={() => handleDeleteSport(sport)}>Delete</button>
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            value={newSport}
            onChange={(e) => setNewSport(e.target.value)}
          />
          <button onClick={handleAddSport}>Add Sport</button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
