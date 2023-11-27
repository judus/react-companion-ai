import React from 'react';
import {UserProvider} from './UserContext';

export const CompositeProvider = ({children}) => {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    );
};