import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';

const RedirectToLogin = () => {
    const {user} = useContext(UserContext); // Correctly destructure `user` from the context
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return null; // This component does not render anything
};

export default RedirectToLogin;
