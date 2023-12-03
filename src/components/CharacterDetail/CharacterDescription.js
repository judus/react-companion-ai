import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function CharacterDescription({character}) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/character/${character.id}/edit`);
    };

    return (
        <div class="character-card">
            <div className="character-image medium">
                <img src={character.image_url} alt={character.name}/>
            </div>
            <div className="character-description">
                <h3>{character.name}</h3>
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
        </div>
    );
}

export default CharacterDescription;
