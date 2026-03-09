import { create } from 'zustand';

// Store global para manejar la sesión y roles de usuario
export const useAuthStore = create((set) => ({
    user: null, // Ejemplo de estructura: { id: 1, name: 'Alejandro', role: 'admin' o 'user' }
    isAuthenticated: false,

    // Función para establecer la sesión tras un login exitoso
    login: (userData, token) => {
        if (token) localStorage.setItem('access_token', token);
        set({ user: userData, isAuthenticated: true });
    },

    // Función para cerrar la sesión
    logout: () => {
        localStorage.removeItem('access_token');
        set({ user: null, isAuthenticated: false });
    },
}));
