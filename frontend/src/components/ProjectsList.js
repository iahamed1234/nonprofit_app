import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import axios from 'axios';

function ProjectsList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch the projects from the API
    axios.get('http://127.0.0.1:8000/api/projects/')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.log('Error fetching the projects:', error);
      });
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      <Link to="/post-opportunity">Post a New Opportunity</Link>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Organization</th>
            <th>Chat</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{new Date(project.start_date).toLocaleDateString()}</td>
              <td>{new Date(project.end_date).toLocaleDateString()}</td>
              <td>{project.organization}</td>
              <td>
                <Link to={`/project/${project.id}`}>Join Chat</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectsList;
