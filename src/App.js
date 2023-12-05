import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, Link, Route, Routes, useNavigate} from 'react-router-dom';
import ChatInterface from './components/ChatInterface/ChatInterface';
import CharacterForm from './components/CharacterForm/CharacterForm'; // Adjust path as needed
import Characters from "./components/Characters/Characters";
import CharacterDetail from "./components/CharacterDetail/CharacterDetail";
import "./styles/layout.scss"
import {UserContext} from "./contexts/UserContext";
import {GoogleLogin} from 'react-google-login';
import LoginOrSignUp from "./components/LoginOrSignup/LoginOrSignup";
import {ProtectedRoute} from "./ProtectedRoute";
import LogoutButton from "./components/LoginOrSignup/LogoutButton";
import {CharactersProvider} from "./contexts/CharactersContext";


function App() {
    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const {user, setUser, setIsLoading} = useContext(UserContext);

    useEffect(() => {
        localStorage.removeItem("characters");
    }, []);

    return (
        <Router>
            <CharactersProvider>
            <div className="App">
                <div className="app-container max-width">
                    <div className="app-header">
                        <div className="content">
                            <h1><Link to="/">Companion AI</Link></h1>
                        </div>
                        <div className="user-area">
                            {user && (
                                <>
                                    <h3>Welcome, {user.name}</h3>
                                    <LogoutButton/>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="app-main">
                        <Routes>
                            <Route path="/" element={<ProtectedRoute><Characters/></ProtectedRoute>}/>
                            <Route path="/login" element={<LoginOrSignUp/>}/>
                            <Route path="/character/create" element={<ProtectedRoute><CharacterForm/></ProtectedRoute>}/>
                            <Route path="/character/:characterId" element={<ProtectedRoute><CharacterDetail/></ProtectedRoute>}/>
                            <Route path="/character/:characterId/edit" element={<ProtectedRoute><CharacterForm/></ProtectedRoute>}/>
                            <Route path="/sessions/:sessionId" element={<ProtectedRoute><ChatInterface selectedSessionId={selectedSessionId} setSelectedSessionId={setSelectedSessionId}/></ProtectedRoute>}/>
                        </Routes>
                    </div>
                    <div className="app-footer">
                        &copy; 2023 Maduser
                    </div>
                </div>
            </div>
            </CharactersProvider>
        </Router>
    );
}

export default App;
