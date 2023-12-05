import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useApiWithToken} from "../../services/useApiWithToken";

function CharacterSessions({character}) {
    const navigate = useNavigate();
    const api = useApiWithToken();
    const [error, setError] = useState('');

    const handleSessionClick = (sessionId) => {
        navigate(`/sessions/${sessionId}`);
    }

    const handleNewSession = async () => {
        api.post(`sessions/${character.id}`)
            .then((data => navigate(`/sessions/${data.data.session.id}`)))
            .catch((error) => {
                setError(error)
            });
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
            <div className="actions">
                <button className="btn-new" onClick={handleNewSession}>New Session</button>
            </div>
        </div>
        );
}

export default CharacterSessions;
