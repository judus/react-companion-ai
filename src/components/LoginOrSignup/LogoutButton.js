import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext'; // Adjust the path as needed
import {useApiWithHttpOnlyCookie} from '../../services/useApiWithHttpOnlyCookie'; // Update the path as needed
import {useApiWithToken} from '../../services/useApiWithToken'; // Update the path as needed

const LogoutButton = () => {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const api = useApiWithHttpOnlyCookie();

    const handleLogout = async () => {
         api.post('logout')
            .then(data => {
                setUser(null);
                localStorage.removeItem('token');
                localStorage.removeItem('characters');
                navigate('/login');
            })
            .catch(error => {
                console.error('Logout failed:', error);
            });
    };

    return (
        <button className="btn-warning btn-small" onClick={handleLogout}>Sign Out</button>
    );
};

export default LogoutButton;
