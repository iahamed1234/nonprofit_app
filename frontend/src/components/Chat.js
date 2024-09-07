import React, { useState, useEffect } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [chatSocket, setChatSocket] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/chat/');

    socket.onopen = () => {
      console.log("WebSocket connection established");
      setChatSocket(socket);  // Set the socket when it's opened
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    };

    socket.onerror = (e) => {
      console.error('WebSocket error occurred:', e);
    };

    socket.onclose = (e) => {
      console.error('Chat socket closed unexpectedly', e);
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.close();
      }
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
      chatSocket.send(JSON.stringify({
        'message': messageInput
      }));
      setMessageInput('');
    } else {
      console.error("WebSocket is not open or ready to send messages.");
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div style={{ border: '1px solid black', height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
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
