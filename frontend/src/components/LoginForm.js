import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ setToken }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/token/', credentials)
      .then(response => {
        setToken(response.data.access);  // Store the token in the parent component
      })
      .catch(error => {
        console.log('Error logging in:', error.response.data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={credentials.username} onChange={handleInputChange} placeholder="Username" required />
      <input type="password" name="password" value={credentials.password} onChange={handleInputChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
