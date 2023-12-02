import React, {createContext, useState} from "react";

export const UserContext = createContext({
    user: null,
    setUser: () => {
    },
    isLoading: true, // Indicates if user data is still being fetched
    setIsLoading: () => {
    } // Function to update the loading state
});

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Start with loading true

    return (
        <UserContext.Provider value={{user, setUser, isLoading, setIsLoading}}>
            {children}
        </UserContext.Provider>
    );
};
