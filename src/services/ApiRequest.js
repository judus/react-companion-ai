class ApiRequest {
    constructor(baseURL, token) {
        this.baseURL = baseURL;
    }

    async request(url, method, data = null, additionalHeaders = {}, token) {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...additionalHeaders,
        };

        const config = {
            method: method,
            headers: headers,
            body: data ? JSON.stringify(data) : null,
        };

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

    get(url, additionalHeaders = {}, token) {
        return this.request(url, 'GET', null, {}, token);
    }

    post(url, data, additionalHeaders = {}, token) {
        return this.request(url, 'POST', data, additionalHeaders, token);
    }

    put(url, data, additionalHeaders = {}, token) {
        return this.request(url, 'PUT', data, additionalHeaders, token);
    }

    patch(url, data, additionalHeaders = {}, token) {
        return this.request(url, 'PATCH', data, additionalHeaders, token);
    }

    delete(url, additionalHeaders = {}, token) {
        return this.request(url, 'DELETE', null, additionalHeaders, token);
    }
}

export default ApiRequest;
