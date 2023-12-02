import React, {useContext, useState} from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import {UserContext} from "../../contexts/UserContext"; // Assuming this is already created

const SignupForm = () => {
    const {user, setUser} = useContext(UserContext);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // const api = useApi(); // Uncomment if using a custom API service

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add validation for userData here (like checking password match)

        // Logic to handle signup with userData
        // Typically involves sending a request to your backend server
        // api.post('/signup', userData).then( /* handle response */ ).catch( /* handle error */ );

        // Mock signup for demonstration (replace with actual signup logic)
        console.log('User data submitted for signup:', userData);

        fetch('http://localhost:8080/api/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                password_confirmation: userData.confirmPassword
            }),
        })
        .then(response => response.json())
        .then(data => {
            if(data.user && data.token) {
                // Assuming the API returns an object with user data and a token
                setUser({...data.user, token: data.token});

                console.log(user);
            } else {
                // Handle any errors or invalid responses
                console.error('Invalid response:', data);
            }
        })
        .catch(error => console.error('Error:', error));

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
                <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={userData.confirmPassword}
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