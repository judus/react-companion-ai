import React, {useContext, useState} from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import {UserContext} from "../../contexts/UserContext";
import {useNavigate} from "react-router-dom";
import {useApiWithHttpOnlyCookie} from "../../services/useApiWithHttpOnlyCookie";
import {useApiWithToken} from "../../services/useApiWithToken";
import axios from "axios";
import {useCharacters} from "../../contexts/CharactersContext";

const LoginForm = () => {
    const api = useApiWithToken()
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const {refreshCharacters} = useCharacters();

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        api.post('login', credentials)
            .then(data => {
                setUser(data.user);
                const token = data.token;
                localStorage.setItem('token', token);
                refreshCharacters();
                navigate('/');
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-field">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="center">
                <button type="submit" className="btn-submit">Log In</button>
            </div>
        </form>
    );
};


export default LoginForm;