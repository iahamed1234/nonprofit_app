import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VolunteersList() {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/volunteers/')
      .then(response => {
        setVolunteers(response.data);
      })
      .catch(error => {
        console.log('Error fetching the volunteers:', error);
      });
  }, []);

  return (
    <div>
      <h2>Volunteers List</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Skills</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map(volunteer => (
            <tr key={volunteer.id}>
              <td>{volunteer.first_name}</td>
              <td>{volunteer.last_name}</td>
              <td>{volunteer.email}</td>
              <td>{volunteer.skills}</td>
              <td>{volunteer.availability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VolunteersList;
