import React, { useState } from 'react';
import axios from 'axios';

function VolunteerRegistrationForm({ token }) {
  const [volunteer, setVolunteer] = useState({
    skills: '',
    availability: '',
    preferred_projects: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVolunteer({ ...volunteer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/volunteers/', volunteer, {
      headers: {
        Authorization: `Bearer ${token}`  // Attach the token for authentication
      }
    })
      .then(response => {
        console.log('Volunteer registered successfully:', response.data);
      })
      .catch(error => {
        console.log('Error registering volunteer:', error.response.data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="skills"
        value={volunteer.skills}
        onChange={handleInputChange}
        placeholder="Skills"
        required
      />
      <input
        type="text"
        name="availability"
        value={volunteer.availability}
        onChange={handleInputChange}
        placeholder="Availability"
        required
      />
      <textarea
        name="preferred_projects"
        value={volunteer.preferred_projects}
        onChange={handleInputChange}
        placeholder="Preferred Projects"
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default VolunteerRegistrationForm;
