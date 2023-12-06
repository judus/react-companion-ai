import React, {useContext, useEffect, useRef, useState} from 'react';
import Markdown from "../Marrdown/Markdown";
import {Link, useParams} from "react-router-dom";
import {UserContext} from "../../contexts/UserContext";
import {useApiWithHttpOnlyCookie} from "../../services/useApiWithHttpOnlyCookie";
import ScoreCard from "../ScoreCard/ScoreCard";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";
import {useLaravelEcho} from "../../services/useLaravelEcho";
import {useApiWithToken} from "../../services/useApiWithToken";
import {useCharacters} from "../../contexts/CharactersContext";
import {imageFolder} from "../../utils/utils";


const ChatInterface = () => {
    const api = useApiWithToken();
    const {user} = useContext(UserContext);
    const {sessionId} = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const [scorecard, setScorecard] = useState({});
    const echo = useLaravelEcho(user);
    const [character, setCharacter] = useState(null);
    const {triggerSessionsReFetch} = useCharacters();


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        api.get(`chat/${sessionId}`)
            .then(data => {
                setMessages(data.data.messages);
                setCharacter(data.data.character);
                if(data.data.scorecard !== null) {
                    setScorecard(data.data.scorecard);
                }
                triggerSessionsReFetch(data.data.character.id)
            })
            .catch(error => {
                console.error('An error occurred:', error.message);
            });

    }, [sessionId]);

    useEffect(() => {
        if(!echo) return;

        const channel = `session.${user.id}.${sessionId}`;

        echo.private(channel)
            .listen('.NewMessageReceived', (e) => {
                setMessages(prevMessages => [...prevMessages, ...e.data.response]);
                e.scorecard && setScorecard(e.scorecard);
            });

        // Cleanup on component unmount
        return () => echo.leave(channel);


    }, [user.id, sessionId, echo]);

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendClick = async () => {
        if(message.trim()) {
            const newMessage = { role: "user", content: message };

            setMessage('');

            api.post(`chat/${sessionId}`, newMessage)
                .then((data) => {
                    setMessages(prevMessages => [...prevMessages, ...data.data.response]);
                })
                .catch(error => {
                    console.log(error)
                });
        }
    };


    const handleKeyDown = async (event) => {
        if(event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            await handleSendClick();
        }
    };

    const handleSessionSelect = (sessionId) => {
        setSelectedSessionId(sessionId);
    };

    const handleDeleteMessage = async (messageId, index) => {
        api.delete(`messages/${messageId}`)
            .then(() => {
                setMessages(prevMessages => prevMessages.slice(0, index));
            })
            .catch(error => {
                console.log(error)
            });
    };

    const handleRetry = async () => {
        // Logic to retry the last action
    };

    return (
        <div className="container">
            <div className="container-header">
                <div className="content">
                    <div className="character-image header">
                        <img src={character ?? character.image_url ? imageFolder("_120x120", character.image_url) : '/logo-circle-dark.svg'}
                             alt={character.name}/>
                    </div>
                    <h2>{character && character.name} #{sessionId}</h2>
                </div>
                <div className="actions">
                    <Link to={character ? `/character/${character.id}` : '#'} className="btn-back">Back</Link>
                </div>
            </div>
            <div className="container-content">
                <ScoreCard scorecard={scorecard}/>
                <div className="messages">
                    <div className="spacer">
                        {Object.values(messages).map((msg, index) => {
                            return (
                                <div key={msg.id} className={`message msg-${msg.role}`}>
                                    <div className={`dialogue`}>
                                        {
                                            msg.role === 'assistant' && character ? (
                                                <div className="character-image offset">
                                                    <img src={character && character.image_url ? imageFolder("_120x120", character.image_url) : '/logo-circle-dark.svg'}
                                                         alt={character.name}/>
                                                </div>
                                            ) : null
                                        }
                                        <Markdown>{msg.content}</Markdown>
                                    </div>
                                    {msg.role === 'user' && (
                                        <div className="actions">
                                            <button className="btn-delete btn-small" onClick={() => handleDeleteMessage(msg.id, index)}>Delete</button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div ref={messagesEndRef}></div>
                </div>
            </div>
            <div className="container-footer">
                <div className="input-area">
                    <textarea
                        rows="1"
                        value={message}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                    ></textarea>
                    <button className="btn-submit" onClick={handleSendClick}>Send</button>
                    <button className="btn-reload" onClick={handleRetry}>Retry</button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
