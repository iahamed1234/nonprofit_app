import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';  // Import the CSS file
import VolunteersList from './components/VolunteersList';
import DonationForm from './components/DonationForm';
import DonationsList from './components/DonationsList';
import ProjectsList from './components/ProjectsList';
import EventsList from './components/EventsList';
import PromoteEvent from './components/PromoteEvent';
import VolunteerRegistration from './components/VolunteerRegistration';
import ProjectPage from './pages/ProjectPage';
import PostOpportunity from './components/PostOpportunity';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/donate">Make a Donation</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/register-volunteer">Register Volunteer</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/volunteers">Volunteers</Link></li>
            <li><Link to="/donations">Donations</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/donate" element={<DonationForm />} />
          <Route path="/post-opportunity" element={<PostOpportunity />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/promote-event/:eventId" element={<PromoteEvent />} />
          <Route path="/register-volunteer" element={<VolunteerRegistration />} />
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/volunteers" element={<VolunteersList />} />
          <Route path="/donations" element={<DonationsList />} />
          <Route path="/project/:projectId" element={<ProjectPage />} />
          <Route
            path="/"
            element={
              <div className="home-page">
                <h1>Welcome to the Volunteer Management Application</h1>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
