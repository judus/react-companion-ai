import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {UserContext} from './contexts/UserContext';

export const ProtectedRoute = ({children}) => {
    const {user, isLoading} = useContext(UserContext);

    const token = localStorage.getItem('token');

    if(isLoading) {
        return <div>Loading...</div>; // Or any loading indicator
    }

    return user ? children : <Navigate to="/login"/>;

};

