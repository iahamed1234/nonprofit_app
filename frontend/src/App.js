
import React from 'react';
import VolunteersList from './components/VolunteersList';
import DonationsList from './components/DonationsList';
import ProjectsList from './components/ProjectsList';
import EventsList from './components/EventsList';


function App() {
  
  return (
    <div>
      <h1>Welcome to Non-Profit Management System</h1>
      <VolunteersList />
      <DonationsList />
      <ProjectsList />
      <EventsList />
    </div>
  );
}

export default App;