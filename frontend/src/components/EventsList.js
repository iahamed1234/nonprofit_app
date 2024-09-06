import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EventsList() {
  const [events, setEvents] = useState([]);
  const [organizations, setOrganizations] = useState([]); // For storing organizations
  const [newEvent, setNewEvent] = useState({ name: '', description: '', location: '', start_time: '', end_time: '', organization: '' });

  useEffect(() => {
    fetchEvents();
    fetchOrganizations(); // Fetch organizations for the mapping
  }, []);

  const fetchEvents = () => {
    axios.get('http://127.0.0.1:8000/api/events/')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.log('Error fetching the events:', error);
      });
  };

  const fetchOrganizations = () => {
    axios.get('http://127.0.0.1:8000/api/organizations/')  // API endpoint to get organizations
      .then(response => {
        setOrganizations(response.data);  // Set organizations for mapping
      })
      .catch(error => {
        console.log('Error fetching the organizations:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/events/', newEvent)
      .then(response => {
        fetchEvents(); // Refresh the list after adding
        setNewEvent({ name: '', description: '', location: '', start_time: '', end_time: '', organization: '' });
      })
      .catch(error => {
        console.log('Error adding the event:', error.response.data);
      });
  };

  const handleDeleteEvent = (eventId) => {
    axios.delete(`http://127.0.0.1:8000/api/events/${eventId}/`)
      .then(response => {
        fetchEvents(); // Refresh the list after deleting
      })
      .catch(error => {
        console.log('Error deleting the event:', error);
      });
  };

  // Helper function to get organization name by ID
  const getOrganizationName = (orgId) => {
    const organization = organizations.find(org => org.id === orgId);
    return organization ? organization.name : 'Unknown';
  };

  return (
    <div>
      <h2>Events</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Organization</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.description}</td>
              <td>{event.location}</td>
              <td>{new Date(event.start_time).toLocaleString()}</td>
              <td>{new Date(event.end_time).toLocaleString()}</td>
              {/* Use getOrganizationName to display the organization name by ID */}
              <td>{getOrganizationName(event.organization)}</td> 
              <td>
                <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Event</h3>
      <form onSubmit={handleAddEvent}>
        <input type="text" name="name" value={newEvent.name} onChange={handleInputChange} placeholder="Event Name" required />
        <input type="text" name="description" value={newEvent.description} onChange={handleInputChange} placeholder="Description" />
        <input type="text" name="location" value={newEvent.location} onChange={handleInputChange} placeholder="Location" required />
        <input type="datetime-local" name="start_time" value={newEvent.start_time} onChange={handleInputChange} required />
        <input type="datetime-local" name="end_time" value={newEvent.end_time} onChange={handleInputChange} required />

        {/* Add organization dropdown */}
        <select name="organization" value={newEvent.organization} onChange={handleInputChange} required>
          <option value="">Select Organization</option>
          {organizations.map(org => (
            <option key={org.id} value={org.id}>{org.name}</option>
          ))}
        </select>

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default EventsList;
