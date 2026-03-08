// Native fetch wrapper to avoid Axios requirement
const API_URL = import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com';

const handleResponse = async (response) => {
    let data;
    try {
        data = await response.json();
    } catch (error) {
        data = {};
    }

    if (!response.ok) {
        // Retornamos la respuesta de error o un mensaje generico
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;
};

export const api = {
    get: (endpoint, headers = {}) => {
        return fetch(`${API_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        }).then(handleResponse);
    },

    post: (endpoint, body, headers = {}) => {
        return fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(body),
        }).then(handleResponse);
    },

    put: (endpoint, body, headers = {}) => {
        return fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(body),
        }).then(handleResponse);
    },

    patch: (endpoint, body, headers = {}) => {
        return fetch(`${API_URL}${endpoint}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(body),
        }).then(handleResponse);
    },

    delete: (endpoint, headers = {}) => {
        return fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        }).then(handleResponse);
    }
};
