// Native fetch wrapper to avoid Axios requirement
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const getAuthHeaders = (customHeaders = {}) => {
    const token = localStorage.getItem('access_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...customHeaders,
    };
};

const handleResponse = async (response) => {
    let data;
    try {
        data = await response.json();
    } catch (error) {
        data = {};
    }

    if (!response.ok) {
        // Retornamos la respuesta de error o un mensaje generico
        const error = (data && data.msg) || (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;
};

export const api = {
    get: (endpoint, headers = {}) => {
        return fetch(`${API_URL}${endpoint}`, {
            method: 'GET',
            headers: getAuthHeaders(headers),
        }).then(handleResponse);
    },

    post: (endpoint, body, headers = {}) => {
        return fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: getAuthHeaders(headers),
            body: JSON.stringify(body),
        }).then(handleResponse);
    },

    put: (endpoint, body, headers = {}) => {
        return fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: getAuthHeaders(headers),
            body: JSON.stringify(body),
        }).then(handleResponse);
    },

    patch: (endpoint, body, headers = {}) => {
        return fetch(`${API_URL}${endpoint}`, {
            method: 'PATCH',
            headers: getAuthHeaders(headers),
            body: JSON.stringify(body),
        }).then(handleResponse);
    },

    delete: (endpoint, headers = {}) => {
        return fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getAuthHeaders(headers),
        }).then(handleResponse);
    }
};
