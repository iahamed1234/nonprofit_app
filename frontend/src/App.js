
// import React from 'react';
// import VolunteersList from './components/VolunteersList';
// import DonationsList from './components/DonationsList';
// import ProjectsList from './components/ProjectsList';
// import EventsList from './components/EventsList';


// function App() {
  
//   return (
//     <div>
//       <h1>Welcome to Non-Profit Management System</h1>
//       <VolunteersList />
//       <DonationsList />
//       <ProjectsList />
//       <EventsList />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import VolunteersList from './components/VolunteersList';
import DonationsList from './components/DonationsList';
import ProjectsList from './components/ProjectsList';
import EventsList from './components/EventsList';
import PromoteEvent from './components/PromoteEvent';
import VolunteerRegistration from './components/VolunteerRegistration';
// import Chat from './components/Chat';
import ProjectPage from './pages/ProjectPage';
import PostOpportunity from './components/PostOpportunity';

// import AddEvent from './components/AddEvent';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/volunteers">Volunteers</Link></li>
            <li><Link to="/donations">Donations</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/register-volunteer">Register Volunteer</Link></li>
            {/* <li><Link to="/chat">Chat</Link></li> */}
            {/* <li><Link to="/add-event">Add New Event</Link></li> */}
          </ul>
        </nav>

        <Routes>
          <Route path="/volunteers" element={<VolunteersList />} />
          <Route path="/donations" element={<DonationsList />} />
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/post-opportunity" element={<PostOpportunity />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/promote-event/:eventId" element={<PromoteEvent />} />
          <Route path="/register-volunteer" element={<VolunteerRegistration />} />
          {/* <Route path="/chat" element={<Chat />} /> */}
          {/* <Route path="/add-event" element={<AddEvent />} /> */}
          <Route path="/project/:projectId" element={<ProjectPage />} />
          <Route path="/" element={<h1>Welcome to the Volunteer Management Application</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
