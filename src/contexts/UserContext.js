import React, {createContext, useState, useContext} from 'react';

// Create a context for the user
export const UserContext = createContext({user: null});
// Hook to use the user context
export const useUser = () => useContext(UserContext);

// Provider component that wraps your app and provides the user object
export const UserProvider = ({children}) => {

    const mockUser = {
        id: 1,
        name: "TheUser",
        email: "julien.duseyau@gmail.com",
        token: process.env.REACT_APP_MOCK_USER_API_TOKEN,
    };

    const [user, setUser] = useState(mockUser);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};