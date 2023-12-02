import ApiRequest from "./ApiRequest";

export const useApiWithHttpOnlyCookie = () => {
    const api = new ApiRequest(process.env.REACT_APP_API_BASE_URL);

    const withCredentials = (apiMethod) => {
        return (...args) => {
            // Ensure the last argument is includeCredentials set to true
            args.push({includeCredentials: true}); // Setting includeCredentials to true
            return apiMethod(...args);
        };
    };

    return {
        get: withCredentials(api.get.bind(api)),
        post: withCredentials(api.post.bind(api)),
        put: withCredentials(api.put.bind(api)),
        patch: withCredentials(api.patch.bind(api)),
        delete: withCredentials(api.delete.bind(api))
    };
};