import React, { useState } from 'react';
import axios from 'axios';

function VolunteerRegistration() {
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState('');
  const [availability, setAvailability] = useState('');
  const [preferredProjects, setPreferredProjects] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/volunteers/register/', {
      name,
      first_name: firstName,  // Send first name
      last_name: lastName,    // Send last name
      email,
      skills,
      availability,
      preferred_projects: preferredProjects,  // Send preferred projects
    })
    .then((response) => {
      setMessage('Volunteer registered successfully!');
    })
    .catch((error) => {
      setMessage('Error registering volunteer. Please try again.');
      console.error("There was an error!", error);
    });
  };

  return (
    <div>
      <h2>Volunteer Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Skills:</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <div>
          <label>Availability:</label>
          <input
            type="text"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
        </div>

        <div>
          <label>Preferred Projects:</label>
          <input
            type="text"
            value={preferredProjects}
            onChange={(e) => setPreferredProjects(e.target.value)}
          />
        </div>

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default VolunteerRegistration;
