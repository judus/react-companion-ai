class ApiRequest {
    constructor(baseURL, token) {
        this.baseURL = baseURL;
    }

    async request(url, method, data = null, options = {}) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...options.options,
        };

        // Add Authorization header if token is provided in options
        if(options.token) {
            headers['Authorization'] = `Bearer ${options.token}`;
        }

        const config = {
            method: method,
            headers: headers,
            body: data ? JSON.stringify(data) : null,
        };


        // Include credentials if specified in options
        if(options.includeCredentials) {
            config.credentials = 'include';
        }

        try {
            const response = await fetch(`${this.baseURL}/${url}`, config);
            if(response.status === 401) {
                throw new Error('Error 401 received from server');
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

export default ApiRequest;
