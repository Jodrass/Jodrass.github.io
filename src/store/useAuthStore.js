import { create } from 'zustand';

// Store global para manejar la sesión y roles de usuario
export const useAuthStore = create((set) => ({
    user: null, // Ejemplo de estructura: { id: 1, name: 'Alejandro', role: 'admin' o 'user' }
    isAuthenticated: false,

    // Función para establecer la sesión tras un login exitoso
    login: (userData) => set({ user: userData, isAuthenticated: true }),

    // Función para cerrar la sesión
    logout: () => set({ user: null, isAuthenticated: false }),
}));
