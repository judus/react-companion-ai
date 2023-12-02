import ApiRequest from '../services/ApiRequest';
import {useContext} from 'react';
import {UserContext} from '../contexts/UserContext';

export const useApiWithToken = () => {
    const {user} = useContext(UserContext);
    const api = new ApiRequest(process.env.REACT_APP_API_BASE_URL);

    const withToken = (apiMethod) => {
        return (...args) => {
            if(!user || !user.token) {
                console.error('User or token is not available');
                return;
            }
            // Add the token as the last argument
            args.push({token: user.token});

            return apiMethod(...args, user.token);
        };
    };

    return {
        get: withToken(api.get.bind(api)),
        post: withToken(api.post.bind(api)),
        put: withToken(api.put.bind(api)),
        patch: withToken(api.patch.bind(api)),
        delete: withToken(api.delete.bind(api))
    };
};
