import React from 'react';
import { useParams } from 'react-router-dom';
import Chat from '../components/Chat';  // Import the Chat component

function ProjectPage() {
  const { projectId } = useParams();  // Get the projectId from the URL

  return (
    <div>
      <h1>Project {projectId}</h1>
      {/* Pass the projectId to the Chat component */}
      <Chat projectId={projectId} />
    </div>
  );
}

export default ProjectPage;
