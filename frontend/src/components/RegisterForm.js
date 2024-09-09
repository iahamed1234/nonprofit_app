import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/register/', formData)
      .then(response => {
        console.log('User registered:', response.data);
        // successful registration
      })
      .catch(error => {
        console.log('Error registering user:', error.response.data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" required />
      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
      <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
