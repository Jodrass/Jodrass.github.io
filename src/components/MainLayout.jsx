import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

// Icono de cruz de farmacia SVG embebido
const PharmacyCross = ({ className = 'w-8 h-8' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="9" y="2" width="6" height="20" rx="1.5" />
        <rect x="2" y="9" width="20" height="6" rx="1.5" />
    </svg>
);

export default function MainLayout() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-light text-dark transition-colors duration-300">
            {/* Header fijo responsivo */}
            <header className="fixed w-full top-0 z-50 bg-primary shadow-xl shadow-primary/20">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 h-16 flex items-center justify-between">
                    {/* Logo + Nombre */}
                    <div
                        className="flex items-center gap-2.5 cursor-pointer"
                        onClick={() => navigate('/user')}
                    >
                        <div className="bg-white/20 rounded-lg p-1.5">
                            <PharmacyCross className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-lg font-extrabold text-white tracking-wide">
                            Clinica<span className="text-purple-200">Joyfe</span>
                        </h1>
                    </div>

                    {/* Nav */}
                    <nav className="flex items-center gap-3 sm:gap-4">
                        <NavLink
                            to="/new-appointment"
                            className={({ isActive }) =>
                                `hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${isActive
                                    ? 'bg-white text-primary shadow'
                                    : 'bg-white/20 text-white hover:bg-white/30'
                                }`
                            }
                        >
                            {/* Plus icon */}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                            Nueva Cita
                        </NavLink>

                        <span className="text-purple-200 hidden md:block text-sm font-medium">
                            {user?.name} {user?.lastname}
                        </span>

                        <button
                            onClick={handleLogout}
                            className="px-4 py-1.5 bg-white text-primary rounded-full text-sm font-semibold hover:bg-purple-50 transition-all shadow-md active:scale-95 duration-200"
                        >
                            Salir
                        </button>
                    </nav>
                </div>
            </header>

            {/* Contenedor principal */}
            <main className="pt-24 pb-12 px-4 sm:px-6 md:px-8 max-w-[1920px] mx-auto min-h-[calc(100vh-4rem)]">
                <Outlet />
            </main>
        </div>
    );
}
