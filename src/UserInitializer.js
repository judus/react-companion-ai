import React, {useContext, useEffect} from 'react';
import {UserContext} from './contexts/UserContext';
import App from './App';

export const UserInitializer = () => {
    const {setUser, setIsLoading} = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:8080/api/user', {
            credentials: 'include'
        })
            .then(response => {
                if(!response.ok) {
                    throw new Error('User not authenticated');
                }
                return response.json();
            })
            .then(user => {
                setUser(user); // Update the global state with the user data
            })
            .catch(error => {
                console.log('User is not logged in:', error);
                setUser(null); // Handle unauthenticated scenario
            })
            .finally(() => {
                setIsLoading(false); // Set loading to false after fetching user data
            });
    }, [setUser, setIsLoading]);

    return <App/>;
};
