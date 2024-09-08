import React, { useState } from 'react';
import axios from 'axios';

function PostOpportunity() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      location,
      start_date: startDate,
      end_date: endDate
    };
    try {
      await axios.post('http://127.0.0.1:8000/api/opportunities/', data);
      alert('Opportunity posted!');
    } catch (error) {
      console.error('Error posting opportunity', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button type="submit">Post Opportunity</button>
    </form>
  );
}

export default PostOpportunity;
