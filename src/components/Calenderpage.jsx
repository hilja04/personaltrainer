//Imports
import React, { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';

//Main function
function CalendarPage() {
    //State variables
    const localizer = dayjsLocalizer(dayjs);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        handleFetch();
    }, []);

    //Fuction to fetch trainings
    const handleFetch = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings')// Fetches trainings from API
            .then(response => response.json())
            .then(data => {
                const formedData = data.map(transformData);  //map the fetched data
                setEvents(formedData);
            })
            .catch(error => console.error('Error fetching training data:', error));  // Handle errors 
    };

    //Function to transform data
    const transformData = (session) => {  //transforming the data to be more suitable for calender
        return {
            title: `${session.customer.firstname} ${session.customer.lastname} - ${session.activity}`,
            start: new Date(session.date),
            end: new Date(new Date(session.date).getTime() + session.duration * 60000),
            description: `${session.activity} session for ${session.customer.firstname} ${session.customer.lastname}`,
        };
    };

    // Handles event click
    const handleEventClick = (event) => {
        setSelectedEvent(event);  //sets the event that is clicked
    };

    return (
        <>
            <div style={{
                backgroundColor: "white", padding: "20px",
                width: '90%', margin: '40px auto', minWidth: '1100px', height: 'auto'
            }}>
                <h2 style={{
                    fontWeight: '600', color: 'black', marginTop: '0', marginBottom: '10px', padding: '0',
                    fontSize: '24px'
                }}>
                    Calendar
                </h2>
                <div style={{ width: '100%', height: '70vh' }}>
                    {/* Calendar container */}
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '100%' }}
                        onSelectEvent={handleEventClick}
                        eventPropGetter={(event) => ({
                            style: {
                                backgroundColor: '#3174ad',
                                color: 'white',
                                borderRadius: '4px',
                            }
                        })}
                    />
                </div>
            </div>
            {/*Shows more details about the clicked event*/}
            {selectedEvent && (
                <div style={{
                    position: 'absolute', top: '20%', left: '30%', right: '30%', backgroundColor: 'white', padding: '20px',
                    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)', borderRadius: '8px', zIndex: '9999'
                }}>
                    <h3>Event Details</h3>
                    <p><strong>Title:</strong> {selectedEvent.title}</p>
                    <p><strong>Activity:</strong> {selectedEvent.description}</p>
                    <p><strong>Start:</strong> {selectedEvent.start.toLocaleString()}</p>
                    <p><strong>End:</strong> {selectedEvent.end.toLocaleString()}</p>
                    <button onClick={() => setSelectedEvent(null)} style={{ padding: '8px 12px', cursor: 'pointer' }}>Close</button>
                </div>
            )}
        </>
    );
}

export default CalendarPage;
