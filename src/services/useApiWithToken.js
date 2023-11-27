import ApiRequest from '../services/ApiRequest';
import {useContext} from 'react';
import {UserContext} from '../contexts/UserContext';

export const useApiWithToken = () => {
    const {user} = useContext(UserContext);
    const api = new ApiRequest('http://localhost:8000/api');

    const withToken = (apiMethod) => {
        return (...args) => {
            if(!user || !user.token) {
                console.error('User or token is not available');
                return;
            }

            // Check if the last argument is an object (assuming it's additionalHeaders)
            // If not, add an empty object as additionalHeaders before the token
            if(args.length === 0 || typeof args[args.length - 1] !== 'object') {
                args.push({}); // Add empty object for additionalHeaders
            }

            // Add the token as the last argument
            args.push(user.token);

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
