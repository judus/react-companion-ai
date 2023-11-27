import React, {useContext, useEffect, useRef, useState} from 'react';
import Markdown from "../Marrdown/Markdown";
import {Link, useParams} from "react-router-dom";
import {UserContext} from "../../contexts/UserContext";
import {useApiWithToken} from "../../services/useApiWithToken";

const ChatInterface = () => {
    const api = useApiWithToken();
    const {user} = useContext(UserContext);
    const {sessionId} = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const [selectedSessionId, setSelectedSessionId] = useState(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        api.get(`chat?sessionId=${sessionId}`)
            .then(data => setMessages(data))
            .catch(error => { console.log(error)} );
    }, [sessionId]);

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendClick = async () => {
        if(message.trim()) {
            const newMessage = {
                role: "user",
                content: message,
            };

            // Update UI immediately with the new message
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setMessage('');

            api.post(`chat?sessionId=${sessionId}`, newMessage)
                .then((data) => {
                    setMessages(prevMessages => [...prevMessages, ...data]);
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
                    <h2>Session {sessionId}</h2>
                </div>
                <div className="actions">
                    <Link to="/" className="btn-back">Back</Link>
                </div>
            </div>
            <div className="container-content">
                <div className="messages">
                    {Object.values(messages).map((msg, index) => {
                        return (
                            <div key={index} className={`message msg-${msg.role}`}>
                                <div className={`dialogue`}>
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
