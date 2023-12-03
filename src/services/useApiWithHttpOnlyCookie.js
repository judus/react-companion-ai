import ApiRequest, {UnauthorizedError} from "./ApiRequest";
import {useContext} from 'react';
import {UserContext} from '../contexts/UserContext';
import {useNavigate} from "react-router-dom";

export const useApiWithHttpOnlyCookie = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const api = new ApiRequest(
        process.env.REACT_APP_API_BASE_URL
    ).withCredentials();


    const handleRequest = async (apiMethod, ...args) => {
        try {
            return await apiMethod(...args);
        } catch(error) {
            if(error instanceof UnauthorizedError) {
                setUser(null);
                navigate('/');
            } else {
                throw error;
            }
        }
    };

    return {
        get: (...args) => handleRequest(api.get.bind(api), ...args),
        post: (...args) => handleRequest(api.post.bind(api), ...args),
        put: (...args) => handleRequest(api.put.bind(api), ...args),
        patch: (...args) => handleRequest(api.patch.bind(api), ...args),
        delete: (...args) => handleRequest(api.delete.bind(api), ...args)
    };
};