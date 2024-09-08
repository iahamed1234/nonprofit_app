import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function EventCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the backend
    axios.get('http://127.0.0.1:8000/api/events/')
      .then(response => {
        // Map the events to the format required by react-big-calendar
        const calendarEvents = response.data.map(event => ({
          title: event.name,
          start: new Date(event.start_time),
          end: new Date(event.end_time),
        }));
        setEvents(calendarEvents);
      })
      .catch(error => {
        console.error('Error fetching events', error);
      });
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default EventCalendar;
