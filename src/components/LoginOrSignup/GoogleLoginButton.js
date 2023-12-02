import React from 'react';
import {GoogleLogin} from 'react-google-login';

const GoogleLoginButton = () => {
    const handleLogin = (response) => {
        // Logic to handle Google login
    };

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
            buttonText="Continue with Google"
            onSuccess={handleLogin}
            onFailure={handleLogin}
            cookiePolicy={'single_host_origin'}
            // isSignedIn={true} // Use this to keep the user signed in
        />
    );
};

export default GoogleLoginButton;