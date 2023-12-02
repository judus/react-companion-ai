import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useApiWithHttpOnlyCookie} from "../../services/useApiWithHttpOnlyCookie";
import RedirectToLogin from "../LoginOrSignup/RedirectToLogin";

function CharacterDetail() {
    const api = useApiWithHttpOnlyCookie();
    const [character, setCharacter] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState('');
    const {characterId, setCharacterId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`characters/${characterId}`)
            .then((data => setCharacter(data.data)))
            .catch((error) => { console.log(error); });
    }, [characterId]);

    if(error) {
        return <div>Error: {error}</div>;
    }

    if(!character) {
        return <div><RedirectToLogin/>Loading...</div>;
    }

    const handleEditClick = () => {
        navigate(`/character/${characterId}/edit`);
    };

    const handleSessionClick = (sessionId) => {
        navigate(`/sessions/${sessionId}`);
    }

    const handleNewSession = async () => {
        api.post(`sessions/${characterId}`)
            .then((data => navigate(`/sessions/${data.data.session.id}`)))
            .catch((error) => {setError(error)});
    }

    return (
        <div className="container">
            <div className="container-header">
                <div className="content">
                    <h2>{character.name}</h2>
                </div>
                <div className="actions">
                    <Link to="/" className="btn-back">Back</Link>
                    <button className="btn-new" onClick={handleNewSession}>New Session</button>
                </div>
            </div>
            <div className="system-messages"></div>
            <div className="container-content">
                <h3>Description</h3>
                <div className="character-details">
                    <div className="field">
                        <div className="field-label">Age:</div>
                        <div className="field-value">{character.age}</div>
                    </div>
                    <div className="field">
                        <div className="field-label">Gender:</div>
                        <div className="field-value">{character.gender}</div>
                    </div>
                    <div className="field">
                        <div className="field-label">Bio:</div>
                        <div className="field-value">{character.bio}</div>
                    </div>
                    <div className="field">
                        <div className="field-label">Occupation:</div>
                        <div className="field-value">{character.occupation || 'Not specified'}</div>
                    </div>
                    <div className="field">
                        <div className="field-label">Traits:</div>
                        <div className="field-value">{character.traits}</div>
                    </div>
                    <div className="field">
                        <div className="field-label">Quirks:</div>
                        <div className="field-value">{character.quirks}</div>
                    </div>
                    <div className="field">
                        <div className="field-label">Interests:</div>
                        <div className="field-value">{character.interests}</div>
                    </div>
                    <div className="field">
                        <div className="field-label">Location:</div>
                        <div className="field-value">{character.location || 'Not specified'}</div>
                    </div>
                    <div className="field">
                        <div className="field-label">Dialogue Style:</div>
                        <div className="field-value">{character.dialogue_style}</div>
                    </div>
                    <div className="actions">
                        <button className="btn-edit" onClick={handleEditClick}>Edit</button>
                    </div>
                </div>
                <div className="character-sessions">
                    <h3>Sessions</h3>
                    <ul className="item-list">
                        {character.chat_sessions.map(session => (
                            <li key={session.id} onClick={() => handleSessionClick(session.id)}>
                                <h4>Session #{session.id}</h4>
                                <button className="btn-delete btn-small">Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CharacterDetail;
