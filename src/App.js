import React, {useContext, useState} from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import ChatInterface from './components/ChatInterface/ChatInterface';
import CharacterForm from './components/CharacterForm/CharacterForm'; // Adjust path as needed
import chatHistory from "./chatHistory.json";
import Characters from "./components/Characters/Characters";
import CharacterDetail from "./components/CharacterDetail/CharacterDetail";
import {CompositeProvider} from "./contexts/CompositeProvider";
import "./styles/layout.css"
import {UserContext} from "./contexts/UserContext";

function App() {
    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const {user} = useContext(UserContext);

    return (
        <Router>
            <div className="App">
                <div className="app-container max-width">
                    <div className="app-header">
                        <div clasName="content">
                            <h1><Link to="/">Companion AI</Link></h1>
                        </div>
                        <div clasName="user-area">
                            <h3>Welcome, {user.name}</h3>
                        </div>
                    </div>
                    <div className="app-main">
                        <Routes>
                            <Route path="/" element={<Characters/>}/>
                            <Route path="/character/create" element={<CharacterForm/>}/>
                            <Route path="/character/:characterId" element={<CharacterDetail/>}/>
                            <Route path="/character/:characterId/edit" element={<CharacterForm/>}/>
                            <Route path="/sessions/:sessionId" element={<ChatInterface selectedSessionId={selectedSessionId} setSelectedSessionId={setSelectedSessionId}/>}/>
                        </Routes>
                    </div>
                    <div className="app-footer">
                        &copy; 2023 Maduser
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
