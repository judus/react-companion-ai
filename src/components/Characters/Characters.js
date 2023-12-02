import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import ApiRequest from '../../services/ApiRequest';
import {useApiWithHttpOnlyCookie} from "../../services/useApiWithHttpOnlyCookie";
import RedirectToLogin from "../LoginOrSignup/RedirectToLogin";

function Characters() {
    const api = useApiWithHttpOnlyCookie();
    const navigate = useNavigate();
    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState('');


    useEffect(() => {
        api.get('characters')
            .then((data => setCharacters(data.data)))
            .catch((error) => { console.log(error); });
    }, []);

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
                                <h4>{character.name}</h4>
                                <div className="character-description-short">
                                    {character.gender}
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
