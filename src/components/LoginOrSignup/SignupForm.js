import React, {useContext, useState} from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import {UserContext} from "../../contexts/UserContext";
import {useApiWithToken} from "../../services/useApiWithToken"; // Assuming this is already created

const SignupForm = () => {
    const api = useApiWithToken();
    const {user, setUser} = useContext(UserContext);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        localStorage.removeItem('characters');

        api.post('register', userData)
        .then(data => {
            if(data.user && data.token) {
                // Assuming the API returns an object with user data and a token
                setUser({...data.user, token: data.token});
            } else {
                // Handle any errors or invalid responses
                console.error('Invalid response:', data);
            }
        })
        .catch(error => console.error('Error:', error));


        // api.post('http://localhost:8080/api/register', {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         name: userData.name,
        //         email: userData.email,
        //         password: userData.password,
        //         password_confirmation: userData.confirmPassword
        //     }),
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         if(data.user && data.token) {
        //             // Assuming the API returns an object with user data and a token
        //             setUser({...data.user, token: data.token});
        //
        //             console.log(user);
        //         } else {
        //             // Handle any errors or invalid responses
        //             console.error('Invalid response:', data);
        //         }
        //     })
        //     .catch(error => console.error('Error:', error));

        // You would also handle navigation to the main page, login page, or showing a success message
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-field">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
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
                    value={userData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-field">
                <label htmlFor="password_confirmation" className="form-label">Confirm Password:</label>
                <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    value={userData.password_confirmation}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="center">
                <button type="submit" className="btn-submit">Sign Up</button>
            </div>
        </form>
    );
};

export default SignupForm;