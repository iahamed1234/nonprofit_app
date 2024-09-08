
// export default Chat;
import React, { useState, useEffect } from 'react';

function Chat({ projectId }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const socket = new WebSocket(`ws://127.0.0.1:8000/ws/project/${projectId}/`);

  useEffect(() => {
    socket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      setMessages(prev => [...prev, data.message]);
    };
    socket.onclose = function (e) {
      console.error('Chat socket closed unexpectedly');
    };
  }, [projectId]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.send(JSON.stringify({ 'message': messageInput }));
    setMessageInput('');
  };

  return (
    <div>
      <h2>Chat Room for Project {projectId}</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Enter your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
