import React, {useState, useEffect} from 'react';

const SessionSelection = ({user, onSessionSelect}) => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/sessions`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        // Other headers...
                    },
                }); // Update with your API endpoint
                if(!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const sessions = await response.json();
                setSessions(sessions);
            } catch(error) {
                console.error('There was a problem fetching the latest messages:', error);
            }
        };

        fetchSessions();

    }, []);

    const handleSessionChange = (event) => {
        const selectedSessionId = event.target.value;
        onSessionSelect(selectedSessionId);
    };

    return (
        <select onChange={handleSessionChange}>
            <option value="">Select a Session</option>
            {sessions.map(session => (
                <option key={session.id} value={session.id}>
                    #{session.id}: {session.character.name} ({session.character.gender}, {session.character.age})
                </option>
            ))}
        </select>
    );
};

export default SessionSelection;