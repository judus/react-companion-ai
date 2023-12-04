import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function CharacterSessions({character}) {
    const navigate = useNavigate();

    const handleSessionClick = (sessionId) => {
        navigate(`/sessions/${sessionId}`);
    }

    return (
        <div className="character-sessions">
            <ul className="item-list">
                {character.chat_sessions && character.chat_sessions.map(session => (
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
