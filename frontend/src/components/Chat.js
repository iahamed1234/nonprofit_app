
// export default Chat;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chat({ projectId, projectName }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [socket, setSocket] = useState(null); // Manage WebSocket state

  useEffect(() => {
    // Initialize WebSocket connection
    const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/project/${projectId}/`);
    setSocket(newSocket);

    // Handle incoming WebSocket messages
    newSocket.onmessage = function (e) {
      console.log('WebSocket message received:', e.data); // Debugging
      const data = JSON.parse(e.data);

      // Update state with new message
      setMessages(prevMessages => [...prevMessages, data]);
    };

    newSocket.onclose = function (e) {
      console.error('Chat socket closed unexpectedly');
    };

    // Cleanup on unmount
    return () => newSocket.close();
  }, [projectId]);

  useEffect(() => {
    // Fetch previous chat messages
    axios.get(`http://127.0.0.1:8000/api/projects/${projectId}/chat-messages/`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching previous messages:', error);
      });
  }, [projectId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && messageInput) {
      socket.send(JSON.stringify({ 'message': messageInput }));
      setMessageInput(''); // Clear the input field after sending
    }
  };

  // Function to format the timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  // Function to clear the chat messages on the frontend
  const clearChat = () => {
    // Call the backend API to clear the chat
    axios.delete(`http://127.0.0.1:8000/api/projects/${projectId}/clear-chat/`)
      .then(response => {
        console.log(response.data.status);
        setMessages([]);  // Clear the chat in the frontend as well
      })
      .catch(error => {
        console.error('Error clearing the chat:', error);
      });
  };

  return (
    <div>
      <h2>Chat Room for {projectName}</h2> {/* Use the projectName */}
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{formatTimestamp(msg.timestamp)}:</strong> {msg.message}
          </p>
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
      <button onClick={clearChat}>Clear Chat</button> {/* Clear chat button */}
    </div>
  );
}

export default Chat;
