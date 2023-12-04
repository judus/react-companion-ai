import React, {createContext, useContext, useEffect, useState} from 'react';
import {useApiWithToken} from "../services/useApiWithToken";

const CharactersContext = createContext();

export const useCharacters = () => useContext(CharactersContext);

export const CharactersProvider = ({children}) => {
    const api = useApiWithToken()
    const [characters, setCharacters] = useState([]);
    const [sessionsFetched, setSessionsFetched] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fetchTrigger, setFetchTrigger] = useState(0);
    const [characterToRefetch, setCharacterToRefetch] = useState(null);


    // Function to fetch characters from localStorage
    const fetchFromLocalStorage = () => {
        const localData = localStorage.getItem('characters');
        return localData ? JSON.parse(localData) : null;
    };

    // Function to fetch characters from the API
    const fetchFromAPI = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await api.get('characters');
            localStorage.setItem('characters', JSON.stringify(data.data));
            setCharacters(data.data);
        } catch(err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const localCharacters = fetchFromLocalStorage();
        if(localCharacters) {
            setCharacters(localCharacters);
        } else {
            fetchFromAPI();
        }
    }, []);

    const fetchChatSessions = async (characterId) => {
        setIsLoading(true);
        try {

            const data = await api.get(`characters/${characterId}`);
            const sessions = data.data.chat_sessions;

            setCharacters(prevCharacters =>
                prevCharacters.map(char =>
                    String(char.id) === String(characterId) ? {...char, chat_sessions: sessions} : char
                )
            );

            // Update localStorage
            const updatedCharacters = characters.map(char =>
                char.id === characterId ? {...char, chat_sessions: sessions} : char
            );

            localStorage.setItem('characters', JSON.stringify(updatedCharacters));
            setSessionsFetched(prev => ({...prev, [characterId]: true}));
        } catch(err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const loadChatSessionsIfNeeded = (characterId) => {
        if(!sessionsFetched[characterId]) { // Check using object property
            const character = characters.find(char => String(char.id) === String(characterId));
            if(character && !character.chat_sessions) {
                fetchChatSessions(characterId);
            }
        }
    };

    const triggerSessionsReFetch = (characterId) => {
        setCharacterToRefetch(characterId); // Set which character's sessions to re-fetch
    };

    useEffect(() => {
        console.log('Refetching sessions for character', characterToRefetch);
        if(characterToRefetch !== null) {
            fetchChatSessions(characterToRefetch);
            setCharacterToRefetch(null); // Reset after fetching
        }
    }, [characterToRefetch]);


    return (
        <CharactersContext.Provider value={{characters, isLoading, error, loadChatSessionsIfNeeded,
            triggerSessionsReFetch}}>
            {children}
        </CharactersContext.Provider>
    );
};

