import React, {useState, useEffect, useContext} from 'react';
import {Link, useParams} from "react-router-dom";
import ApiRequest from "../../services/ApiRequest";
import {UserContext} from "../../contexts/UserContext";
import {useApiWithToken} from "../../services/useApiWithToken";


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
        quirks: '',
        interests: '',
        location: '',
        dialogue_style: '',
        prompt: '',
        is_public: false,
    });
    const [isEditing, setIsEditing] = useState(!!characterId);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (characterId) {
            api.get(`characters/${characterId}`)
                .then((data => {
                    localStorage.removeItem('characters');
                    const fetchedCharacter = {
                        ...data.data,
                        name: data.data.name || '',
                        age: data.data.age || '',
                        gender: data.data.gender || '',
                        bio: data.data.bio || '',
                        occupation: data.data.occupation || '',
                        traits: data.data.traits || '',
                        quirks: data.data.quirks || '',
                        interests: data.data.interests || '',
                        location: data.data.location || '',
                        dialogue_style: data.data.dialogue_style || '',
                        prompt: data.data.prompt || '',
                        is_public: data.data.is_public !== undefined ? data.data.is_public : false
                    };

                    setCharacter(fetchedCharacter);
                }))
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [characterId]);

    const handleChange = (e) => {
        const {name, type, checked, value} = e.target;

        if(type === "checkbox") {
            setCharacter({...character, [name]: checked});
        } else {
            setCharacter({...character, [name]: value});
        }
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
                </div>
            </div>
            <div className="system-messages">
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
                        <input type="text" name="quirks" placeholder="Quirks" value={character.quirks} onChange={handleChange}/>
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
                        <input type="text" name="dialogue_style" placeholder="Dialogue Style"
                               value={character.dialogue_style} onChange={handleChange}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="is_public_section" className="form-label">Visibility</label>
                        <div>
                            <input
                                type="checkbox"
                                id="is_public"
                                name="is_public"
                                checked={character.is_public}
                                onChange={handleChange}
                            />
                            <label htmlFor="is_public" className="checkbox-label">Make character public</label>
                        </div>
                    </div>
                    <div className="form-field">
                        <label htmlFor="prompt" className="form-label">Prompt</label>
                        <textarea name="prompt" placeholder="Prompt" value={character.prompt} onChange={handleChange}></textarea>
                    </div>


                </form>
                <div className="actions">
                <button type="submit" onClick={handleSubmit} className="btn-save">Save</button>
                </div>
            </div>
        </div>
    );
}

export default CharacterForm;
