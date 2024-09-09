import React, { useState } from 'react';
import axios from 'axios';

function RegisterForEvent({ eventId }) {
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const data = { user: 1, event: eventId };  // user ID 1 as admin
      await axios.post('http://127.0.0.1:8000/api/registrations/', data);
      setMessage('Successfully registered for the event!');
    } catch (error) {
      setMessage('Error registering for the event.');
      console.error('Registration error', error);
    }
  };

  return (
    <div>
      <button onClick={handleRegister}>Register for Event</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterForEvent;