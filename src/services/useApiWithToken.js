import ApiRequest from '../services/ApiRequest';
import {useContext} from 'react';
import {UserContext} from '../contexts/UserContext';

export const useApiWithToken = () => {
    const {user} = useContext(UserContext);

    // Check if user or user's token is available
    const token = localStorage.getItem('token');
    // Instantiate ApiRequest with token

    const api = new ApiRequest(process.env.REACT_APP_API_BASE_URL).withToken(token);

    return {
        get: api.get.bind(api),
        post: api.post.bind(api),
        put: api.put.bind(api),
        patch: api.patch.bind(api),
        delete: api.delete.bind(api)
    };
};
