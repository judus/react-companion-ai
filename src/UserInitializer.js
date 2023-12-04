import React, {useContext, useEffect} from 'react';
import {UserContext} from './contexts/UserContext';
import App from './App';
import {useApiWithToken} from "./services/useApiWithToken";

export const UserInitializer = () => {
    const api = useApiWithToken();
    const {setUser, setIsLoading} = useContext(UserContext);

    useEffect(() => {

        api.get('user')
            .then(user => {
                setUser(user); // Update the global state with the user data
            })
            .catch(error => {
                console.log('User is not logged in:', error);
                setUser(null); // Handle unauthenticated scenario
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [setUser, setIsLoading]);

    return <App/>;
};
