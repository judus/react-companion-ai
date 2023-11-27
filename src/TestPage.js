import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './TestPage.css';

function TestPage({user}) {

    return (
        <div className="app-container">
            <div className="panel user-profile">
                <div className="profile-picture"></div>
                <div className="user-details">
                    <h3 className="user-name">User Name</h3>
                    <p className="user-status">Online</p>
                </div>
            </div>

            <div className="panel info-panel">
                <h3 className="info-title">Today's Schedule</h3>
                <p className="info-content">Meeting at 2 PM</p>
                <p className="info-content">Call with HR at 3 PM</p>
            </div>

            <div className="container chat-container">
            </div>

            <div className="field message-field">
                <input type="text" placeholder="Type a message..." className="message-input"/>
                    <button className="btn send">Send</button>
            </div>

            <div className="toolbar">
                <button className="btn toolbar-btn">+</button>
            </div>
        </div>

);
}

export default TestPage;
