import React, {useState, useEffect, useContext} from 'react';
import {Link, useParams} from "react-router-dom";
import ApiRequest from "../../services/ApiRequest";
import {UserContext} from "../../contexts/UserContext";
import {useApiWithToken} from "../../services/useApiWithToken";

const api = new ApiRequest('http://localhost:8000/api');

function CharacterForm() {
    const api = useApiWithToken();

    const {characterId} = useParams();

    const [character, setCharacter] = useState({
        name: '',
        age: '',
        gender: '',
        bio: '',
        occupation: '',
        traits: '',
        interests: '',
        location: '',
        dialogueStyle: '',
        prompt: '',
    });
    const [isEditing, setIsEditing] = useState(characterId ? true : false);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (characterId) {
            api.get(`characters/${characterId}`)
                .then((data => setCharacter(data.data)))
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [characterId]);

    const handleChange = (e) => {
        setCharacter({...character, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        const url = `characters${isEditing ? `/${characterId}` : ''}`;
        const method = isEditing ? 'put' : 'post';

        api[method](url, character)
            .then(data => {
                const message = isEditing ? 'Character updated successfully!' : 'Character created successfully!';
                setSuccessMessage(message);
                setCharacter(data.data);
            })
            .catch(error => {
                setErrorMessage(`Error occurred while ${isEditing ? 'updating' : 'creating'} the character`);
                console.log(error);
            });
    };

    return (
        <div className="container">
            <div className="container-header">
                <div className="content">
                    <h2>{isEditing ? 'Edit Character' : 'Create Character'}</h2>
                </div>
                <div className="actions">
                    <Link to="/" className="btn-back">Back</Link>
                    <button type="submit" className="btn-save" onClick={handleSubmit}>Save</button>
                </div>
            </div>
            <div class="system-messages">
                {successMessage && <div className="flash-message success">{successMessage}</div>}
                {errorMessage && <div className="flash-message error">{errorMessage}</div>}
            </div>
            <div className="main character-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name="name" placeholder="Name" value={character.name} onChange={handleChange}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="number" name="age" placeholder="Age" value={character.age} onChange={handleChange}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <input type="text" name="gender" placeholder="Gender" value={character.gender} onChange={handleChange}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="bio" className="form-label">Bio</label>
                        <textarea name="bio" placeholder="Bio" value={character.bio} onChange={handleChange}></textarea>
                    </div>

                    <div className="form-field">
                        <label htmlFor="occupation" className="form-label">Occupation</label>
                        <input type="text" name="occupation" placeholder="Occupation" value={character.occupation} onChange={handleChange}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="traits" className="form-label">Traits</label>
                        <input type="text" name="traits" placeholder="Traits" value={character.traits} onChange={handleChange}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="quirks" className="form-label">Quirks</label>
                        <input type="text" name="quirks" placeholder="Traits" value={character.quirks} onChange={handleChange}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="interests" className="form-label">Interests</label>
                        <input type="text" name="interests" placeholder="Interests" value={character.interests} onChange={handleChange}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input type="text" name="location" placeholder="Location" value={character.location} onChange={handleChange}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="dialogue_style" className="form-label">Dialogue Style</label>
                        <input type="text" name="dialogue_style" placeholder="Dialogue Style" value={character.dialogue_style} onChange={handleChange}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="prompt" className="form-label">Prompt</label>
                        <textarea name="prompt" placeholder="Prompt" value={character.prompt} onChange={handleChange}></textarea>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CharacterForm;
