import React, {useState} from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import GoogleLoginButton from "./GoogleLoginButton";

const LoginOrSignup = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div>
            {isLogin ? <LoginForm/> : <SignupForm/>}
            <div className="center">
                <div>
                    <a onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
                    </a>
                </div>
                <GoogleLoginButton/>
            </div>
        </div>
    );
};

export default LoginOrSignup;