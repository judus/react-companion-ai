import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useApiWithHttpOnlyCookie} from "../../services/useApiWithHttpOnlyCookie";
import RedirectToLogin from "../LoginOrSignup/RedirectToLogin";
import TabbedContents from "../TabbedContents/TabbedContents";
import CharacterDescription from "./CharacterDescription";
import CharacterSessions from "./CharacterSessions";

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
        <div className="container character-details">
            <div className="container-header">
                <div className="content">
                    <div className="character-image header">
                        <img src={character.image_url} alt={character.name}/>
                    </div>
                    <h2>{character.name}</h2>
                </div>
                <div className="actions">
                    <Link to="/" className="btn-back">Back</Link>
                    <button className="btn-new" onClick={handleNewSession}>New Session</button>
                </div>
            </div>
            <div className="system-messages"></div>
            <div className="container-content">
                <TabbedContents identifier="character" tabs={[
                    {title: 'Description', content: <CharacterDescription character={character}/>},
                    {title: 'Sessions', content: <CharacterSessions sessions={character.chat_sessions}/>},
                ]}/>
            </div>
        </div>
    );
}

export default CharacterDetail;
