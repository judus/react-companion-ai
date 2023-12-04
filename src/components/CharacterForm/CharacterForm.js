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
        dialogueStyle: '',
        prompt: '',
    });
    const [isEditing, setIsEditing] = useState(!!characterId);

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
                    <button type="submit" onClick={handleSubmit} className="btn-save">Save</button>
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
                        <input type="text" name="dialogue_style" placeholder="Dialogue Style" value={character.dialogue_style} onChange={handleChange}/>
                    </div>

                    <div className="attributes">
                        <div className="form-field">
                            <label htmlFor="happiness" className="form-label">Happiness</label>
                            <input type="number" name="happiness" placeholder="Happiness" value={character.happiness}
                                   onChange={handleChange} min="0" max="10"/>
                        </div>

                        <div className="form-field">
                            <label htmlFor="interest" className="form-label">Interest</label>
                            <input type="number" name="interest" placeholder="Interest" value={character.interest}
                                   onChange={handleChange} min="0" max="10"/>
                        </div>

                        <div className="form-field">
                            <label htmlFor="sadness" className="form-label">Sadness</label>
                            <input type="number" name="sadness" placeholder="Sadness" value={character.sadness}
                                   onChange={handleChange} min="0" max="10"/>
                        </div>

                        <div className="form-field">
                            <label htmlFor="frustration" className="form-label">Frustration</label>
                            <input type="number" name="frustration" placeholder="Frustration" value={character.frustration}
                                   onChange={handleChange} min="0" max="10"/>
                        </div>

                        <div className="form-field">
                            <label htmlFor="fear" className="form-label">Fear</label>
                            <input type="number" name="fear" placeholder="Fear" value={character.fear}
                                   onChange={handleChange} min="0" max="10"/>
                        </div>

                        <div className="form-field">
                            <label htmlFor="surprise" className="form-label">Surprise</label>
                            <input type="number" name="surprise" placeholder="Surprise" value={character.surprise}
                                   onChange={handleChange} min="0" max="10"/>
                        </div>

                        <div className="form-field">
                            <label htmlFor="trust" className="form-label">Trust</label>
                            <input type="number" name="trust" placeholder="Trust" value={character.trust}
                                   onChange={handleChange} min="0" max="10"/>
                        </div>

                        <div className="form-field">
                            <label htmlFor="romantic_attachment" className="form-label">Romantic Attachment</label>
                            <input type="number" name="romantic_attachment" placeholder="Romantic Attachment"
                                   value={character.romantic_attachment} onChange={handleChange} min="0" max="10"/>
                        </div>

                        <div className="form-field">
                            <label htmlFor="confidence" className="form-label">Confidence</label>
                            <input type="number" name="confidence" placeholder="Confidence" value={character.confidence}
                                   onChange={handleChange} min="0" max="10"/>
                        </div>

                        <div className="form-field">
                            <label htmlFor="loneliness" className="form-label">Loneliness</label>
                            <input type="number" name="loneliness" placeholder="Loneliness" value={character.loneliness}
                                   onChange={handleChange} min="0" max="10"/>
                        </div>

                        <div className="form-field">
                            <label htmlFor="confusion" className="form-label">Confusion</label>
                            <input type="number" name="confusion" placeholder="Confusion" value={character.confusion}
                                   onChange={handleChange} min="0" max="10"/>
                        </div>

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
