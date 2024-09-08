import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import axios from 'axios';

function PostOpportunity() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [organization, setOrganization] = useState('');
  const [organizations, setOrganizations] = useState([]);

  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    // Fetch organizations for the dropdown
    axios.get('http://127.0.0.1:8000/api/organizations/')
      .then(response => {
        setOrganizations(response.data);
      })
      .catch(error => {
        console.error('Error fetching organizations', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      description,
      location,
      start_date: startDate,
      end_date: endDate,
      organization
    };

    try {
      await axios.post('http://127.0.0.1:8000/api/projects/', data);
      alert('Project posted!');
      navigate('/projects');  // Redirect to the ProjectsList page
    } catch (error) {
      console.error('Error posting project', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Project Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

      <select value={organization} onChange={(e) => setOrganization(e.target.value)} required>
        <option value="">Select Organization</option>
        {organizations.map(org => (
          <option key={org.id} value={org.id}>
            {org.name}
          </option>
        ))}
      </select>

      <button type="submit">Post Project</button>
    </form>
  );
}

export default PostOpportunity;
