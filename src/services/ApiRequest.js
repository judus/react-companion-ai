export class UnauthorizedError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

export default class ApiRequest {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.includeCredentials = false;
        this.token = null;
    }

    withCredentials() {
        this.includeCredentials = true;
        return this;
    }

    withToken(token) {
        this.token = token;
        return this;
    }

    async request(url, method, data = null, options = {}) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...options.options,
        };

        // Add Authorization header if token is provided in options
        if(this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const config = {
            method: method,
            headers: headers,
            body: data ? JSON.stringify(data) : null,
        };


        // Include credentials if specified in options
        if(this.includeCredentials) {
            config.credentials = 'include';
        }

        try {
            const response = await fetch(`${this.baseURL}/${url}`, config);
            if(response.status === 204) {
                return response;
            }

            if(response.status === 401) {
                throw new UnauthorizedError('Unauthorized', 401);
            } else if(response.status === 500) {
                throw new Error('Error 500 received from server');
            } else if(!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();


        } catch(error) {
            console.error('API request error:', error);
            throw error;
        }

    }

    get(url, options = {}) {
        return this.request(url, 'GET', null, options);
    }

    post(url, data, options = {}) {
        return this.request(url, 'POST', data, options);
    }

    put(url, data, options = {}) {
        return this.request(url, 'PUT', data, options);
    }

    patch(url, data, options = {}) {
        return this.request(url, 'PATCH', data, options);
    }

    delete(url, options = {}) {
        return this.request(url, 'DELETE', null, options);
    }
}

