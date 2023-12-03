import React from 'react';
import {GoogleLogin} from 'react-google-login';

const GoogleLoginButton = () => {
    const handleButton = (response) => {
        const currentUrl = window.location.href;
        window.location.href = `${process.env.REACT_APP_SIGNIN_WITH_GOOGLE_URI}?redirect=${currentUrl}`;
    };

    return (
        <button id="google-btn" onClick={handleButton}>
            <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAilBMVEVHcEz9/f3////m6Ojw8fH9/f3////////09fX5+fnz8/Tt7u/t7u////9Bf+1LnFTbUDs7lkX7+vnYPB72uzL219MzeO3aSjP2thngaUcmc+3l7+66zffH3sqaxZ/nlYv97M2AtobkhnrrqKBAnFn40IBto1ONp0u5rDjkioSlw9qOrvNAknlznfE4nf38AAAADXRSTlMAs/FBKzJvlxqogENCbeDs1AAAAUFJREFUOI2VU9t2gyAQVGNU0lqQi0ismqTpvf3/3yt3kNhz2nlxYWaX2UWy7D8oqxqAuiq32aZuPermlo9oLUnTizZBsSqyT2mFfZRvt9giOBcLs8tQw9RngnCEEOdEGEmx9vdEkAMnLHbaBJ4TCY7IsjpEF2CKJxeGMbt43pbQoVD5sjBW4tCJb/E0CEQiIm61UsEzpeJ9YxaVs0ApHU566/hgcHx0JnIVDFKAtaC3gl4L8r8I0iN6CS+ovcmBvs3B27f0MDqTts3Xazc6fpROe9+mGdTLFUJoFVid8OkHlQEVTZ0UdPOI8Th/qS61ZRBd1qwUsJOQHzsF90eASAGN7KMNBSTMBCZoJR2cjJfwHqz76SyT4Xmyy+h93G/cU3sX/9YlTmmcvi+w5kF2gwb4KhhsPD2F3QHkOTjsttlf8ANQZSoZjCvBoAAAAABJRU5ErkJggg=="
                alt="Google"/>
            Sign in with Google
        </button>
    );
};

export default GoogleLoginButton;