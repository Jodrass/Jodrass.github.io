import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function MainLayout() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light transition-colors duration-300">
            {/* Header fijo responsivo */}
            <header className="fixed w-full top-0 z-50 bg-primary shadow-lg bg-opacity-90 backdrop-blur-md">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* SVG embebido, sin usar librerías de iconos como se exige */}
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <h1 className="text-xl font-bold text-white tracking-widest uppercase">LoveApp</h1>
                    </div>

                    <nav className="flex items-center gap-4">
                        <span className="text-white hidden sm:block font-medium">Hello, {user?.name || 'Guest'}</span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-white text-primary rounded-full text-sm font-semibold hover:bg-secondary transition-all shadow-md transform hover:-translate-y-1 active:scale-95 duration-200"
                        >
                            Logout
                        </button>
                    </nav>
                </div>
            </header>

            {/* Contenedor principal para las vistas anidadas (Outlet) */}
            <main className="pt-24 pb-12 px-4 sm:px-6 md:px-8 max-w-[1920px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col">
                <Outlet />
            </main>
        </div>
    );
}
