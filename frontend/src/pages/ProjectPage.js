import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Chat from '../components/Chat';  // Import the Chat component

function ProjectPage() {
  const { projectId } = useParams();  // Get the projectId from the URL
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    // Fetch project details to get the project name
    axios.get(`http://127.0.0.1:8000/api/projects/${projectId}/`)
      .then(response => {
        setProjectName(response.data.name);
      })
      .catch(error => {
        console.error('Error fetching project details:', error);
      });
  }, [projectId]);

  return (
    <div>
      <h1>Project: {projectName}</h1> {/* Display the project name */}
      <Chat projectId={projectId} projectName={projectName} />
    </div>
  );
}

export default ProjectPage;
