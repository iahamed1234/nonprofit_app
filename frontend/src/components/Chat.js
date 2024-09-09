// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Chat({ projectId }) {
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState('');
//   const socket = new WebSocket(`ws://127.0.0.1:8000/ws/project/${projectId}/`);

//   // Fetch previous chat messages when the component mounts and when projectId changes
//   useEffect(() => {
//     if (!projectId) {
//       console.error('Project ID is undefined!');
//       return;
//     }

//     // Fetch previous chat messages
//     axios.get(`http://127.0.0.1:8000/api/projects/${projectId}/chat-messages/`)
//     .then(response => {
//         setMessages(response.data);
//     })
//     .catch(error => {
//         console.error('Error fetching previous messages:', error);
//     });
//   }, [projectId]);

//   // Handle WebSocket messages
//   useEffect(() => {
//     socket.onmessage = function (e) {
//       const data = JSON.parse(e.data);
//       setMessages(prev => [...prev, data.message]);
//     };

//     socket.onclose = function (e) {
//       console.error('Chat socket closed unexpectedly');
//     };

//     return () => socket.close(); // Clean up WebSocket connection on unmount
//   }, [projectId]);

//   // Send message to WebSocket
//   const sendMessage = (e) => {
//     e.preventDefault();
//     socket.send(JSON.stringify({ 'message': messageInput }));
//     setMessageInput('');
//   };

//   return (
//     <div>
//       <h2>Chat Room for Project {projectId}</h2>
//       {/* <div>
//         {messages.map((msg, index) => (
//           <p key={index}>{msg}</p>
//         ))}
//       </div> */}
//       <div>
//         {messages.map((msg, index) => (
//             <p key={index}>
//             <strong>{msg.timestamp}:</strong> {msg.message}
//             </p>
//         ))}
//         </div>
//       <form onSubmit={sendMessage}>
//         <input
//           type="text"
//           value={messageInput}
//           onChange={(e) => setMessageInput(e.target.value)}
//           placeholder="Enter your message..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// }

// export default Chat;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chat({ projectId }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const socket = new WebSocket(`ws://127.0.0.1:8000/ws/project/${projectId}/`);

  useEffect(() => {
    // Fetch previous chat messages
    axios.get(`http://127.0.0.1:8000/api/projects/${projectId}/chat-messages/`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching previous messages:', error);
      });

    // Handle incoming WebSocket messages
    socket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      setMessages(prev => [...prev, data]);
    };

    socket.onclose = function (e) {
      console.error('Chat socket closed unexpectedly');
    };

    return () => socket.close();
  }, [projectId]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.send(JSON.stringify({ 'message': messageInput }));
    setMessageInput(''); // Clear the input field after sending
  };

  return (
    <div>
      <h2>Chat Room for Project {projectId}</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.timestamp}:</strong> {msg.message}
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
    </div>
  );
}

export default Chat;
