import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import ApiRequest from '../../services/ApiRequest';
import {useApiWithHttpOnlyCookie} from "../../services/useApiWithHttpOnlyCookie";
import RedirectToLogin from "../LoginOrSignup/RedirectToLogin";
import axios from "axios";
import {useApiWithToken} from "../../services/useApiWithToken";
import {useCharacters} from '../../contexts/CharactersContext';
import {imageFolder} from "../../utils/utils"; // Update the path accordingly


function Characters() {
    const api = useApiWithToken();
    const navigate = useNavigate();
    const {characters, updateCharacters} = useCharacters();
    const [error, setError] = useState('');


    const handleClick = (characterId) => {
        navigate(`/character/${characterId}`);
    };

    return (
        <div className="container">
            <div className="container-header">
                <div className="content">
                    <h2>Characters</h2>
                </div>
                <div className="actions">
                    <Link to="/character/create" className="btn-new">Create Character</Link>
                </div>
            </div>
            <div className="character-list">
                <ul className="item-list">
                    {characters.map((character) => (
                        <li key={character.id} onClick={() => handleClick(character.id)}>
                            <div className="character-short">
                                <div className="character-card">
                                    <div className="character-image">
                                        <img src={character.image_url ? imageFolder("_120x120", character.image_url) : '/logo-circle-dark.svg'} alt={character.name}/>
                                    </div>
                                    <div className="character-description">
                                        <h4>{character.name}</h4>
                                        <div className="character-description-short">
                                            {character.gender}
                                        </div>
                                        <div className="character-visibility">
                                            <div className="badge-small"
                                                 title={character.is_public ? 'This character is available to everyone' : 'This character is available only to you'}>
                                                { character.is_public ? 'Public' : 'Private'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Characters;
