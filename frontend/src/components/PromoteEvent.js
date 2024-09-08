import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PromoteEvent() {
  const { eventId } = useParams();
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = () => {
    axios.get('http://127.0.0.1:8000/api/skills/') // Assume you have an API to fetch unique skills
      .then(response => {
        setSkills(response.data);
      })
      .catch(error => {
        console.log('Error fetching skills:', error);
      });
  };

  const handleSkillChange = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const fetchVolunteers = () => {
    if (selectedSkills.length === 0) return;

    axios.post('http://127.0.0.1:8000/api/volunteers/by-skills/', { skills: selectedSkills })
      .then(response => {
        setVolunteers(response.data);
      })
      .catch(error => {
        console.log('Error fetching volunteers:', error);
      });
  };

  const handleVolunteerSelection = (volunteer) => {
    if (selectedVolunteers.includes(volunteer)) {
      setSelectedVolunteers(selectedVolunteers.filter(v => v !== volunteer));
    } else {
      setSelectedVolunteers([...selectedVolunteers, volunteer]);
    }
  };

  const handleSendEmail = () => {
    axios.post('http://127.0.0.1:8000/api/send-email/', {
      eventId,
      volunteerIds: selectedVolunteers.map(v => v.id)
    })
    .then(response => {
      alert('Emails sent successfully!');
    })
    .catch(error => {
      console.log('Error sending emails:', error);
    });
  };

  return (
    <div>
      <h2>Promote Event #{eventId}</h2>
      
      <h3>Select Skills</h3>
      <div>
        {skills.map(skill => (
          <div key={skill}>
            <input
              type="checkbox"
              value={skill}
              onChange={() => handleSkillChange(skill)}
            />
            {skill}
          </div>
        ))}
        <button onClick={fetchVolunteers}>Find Volunteers</button>
      </div>

      <h3>Select Volunteers</h3>
      <div>
        {volunteers.map(volunteer => (
          <div key={volunteer.id}>
            <input
              type="checkbox"
              value={volunteer.id}
              onChange={() => handleVolunteerSelection(volunteer)}
            />
            {volunteer.user.email} (Skills: {volunteer.skills})
          </div>
        ))}
      </div>

      <button onClick={handleSendEmail}>Send Email</button>
    </div>
  );
}

export default PromoteEvent;
