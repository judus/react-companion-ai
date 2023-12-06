import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useApiWithHttpOnlyCookie} from "../../services/useApiWithHttpOnlyCookie";
import RedirectToLogin from "../LoginOrSignup/RedirectToLogin";
import TabbedContents from "../TabbedContents/TabbedContents";
import CharacterDescription from "./CharacterDescription";
import CharacterSessions from "./CharacterSessions";
import {useApiWithToken} from "../../services/useApiWithToken";
import {useCharacters} from "../../contexts/CharactersContext";
import {imageFolder} from "../../utils/utils";


function CharacterDetail() {
    const api = useApiWithToken();
    const [error, setError] = useState('');
    const {characters, loadChatSessionsIfNeeded} = useCharacters();
    const {characterId, setCharacterId} = useParams();
    const [sessions, setSessions] = useState([]);
    const navigate = useNavigate();

    const getCharacterById = (characters, id) => {
        if(Array.isArray(characters)) {
            return characters.find(character => String(character.id) === String(id));
        } else {
            return null; // or some default value
        }
    };


    useEffect(() => {
        loadChatSessionsIfNeeded(characterId);
    }, [characterId, loadChatSessionsIfNeeded]);

    const character = getCharacterById(characters, characterId);


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


    return (
        <div className="container character-details">
            <div className="container-header">
                <div className="content">
                    <div className="character-image header">
                        <img src={character.image_url ? imageFolder("_120x120", character.image_url) : '/logo-circle-dark.svg'}
                             alt={character.name}/>
                    </div>
                    <h2>{character.name}</h2>
                </div>
                <div className="actions">
                    <Link to="/" className="btn-back">Back</Link>
                </div>
            </div>
            <div className="system-messages"></div>
            <div className="container-content">
                <TabbedContents identifier="character" tabs={[
                    {
                        title: 'Description',
                        content: <CharacterDescription character={character}/>
                    },
                    {
                        title: 'Sessions',
                        content: <CharacterSessions character={character}/>
                    },
                ]}/>
            </div>
        </div>
    );
}

export default CharacterDetail;
