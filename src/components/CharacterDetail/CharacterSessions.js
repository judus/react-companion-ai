import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function CharacterSessions({sessions}) {
    const navigate = useNavigate();

    const handleSessionClick = (sessionId) => {
        navigate(`/sessions/${sessionId}`);
    }

    return (
        <div className="character-sessions">
            <ul className="item-list">
                {sessions.map(session => (
                    <li key={session.id} onClick={() => handleSessionClick(session.id)}>
                        <h4>Session #{session.id}</h4>
                        <button className="btn-delete btn-small">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CharacterSessions;
