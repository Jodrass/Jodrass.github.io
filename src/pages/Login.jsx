import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';
import { api } from '../services/api';

// Icono de cruz de farmacia SVG embebido
const PharmacyCross = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <rect x="9" y="2" width="6" height="20" rx="1.5" />
        <rect x="2" y="9" width="20" height="6" rx="1.5" />
    </svg>
);

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const onSubmit = async (data) => {
        setLoading(true);
        setApiError('');
        try {
            // 1. Login con username y password (según API)
            const authResponse = await api.post('/login', {
                username: data.username,
                password: data.password
            });

            const token = authResponse.access_token;
            localStorage.setItem('access_token', token);

            // 2. Obtener perfil
            const profile = await api.get('/profile');
            const role = profile.username === 'admin' ? 'admin' : 'user';

            login({ ...profile, role }, token);
            navigate('/user');
        } catch (error) {
            setApiError(typeof error === 'string' ? error : 'Credenciales incorrectas');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-accent to-purple-900 p-4">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl shadow-primary/30 p-8 sm:p-10">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white mb-4 shadow-lg shadow-primary/40">
                            <PharmacyCross />
                        </div>
                        <h2 className="text-3xl font-extrabold text-dark tracking-tight">ClinicaJoyfe</h2>
                        <p className="text-gray-400 mt-1 text-sm">Accede a tu área personal</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1.5">Usuario</label>
                            <input
                                {...register('username', { required: 'El usuario es obligatorio' })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark placeholder:text-gray-300"
                                placeholder="tu_usuario"
                                autoComplete="username"
                            />
                            {errors.username && <span className="text-red-500 text-xs mt-1 block">{errors.username.message}</span>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1.5">Contraseña</label>
                            <input
                                {...register('password', { required: 'La contraseña es obligatoria', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
                                type="password"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark placeholder:text-gray-300"
                                placeholder="••••••••"
                                autoComplete="current-password"
                            />
                            {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
                        </div>

                        {/* API Error */}
                        {apiError && (
                            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                                {apiError}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-accent active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                                    </svg>
                                    Iniciar Sesión
                                </>
                            )}
                        </button>
                    </form>

                    {/* Link to register */}
                    <p className="text-center text-sm text-gray-400 mt-6">
                        ¿No tienes cuenta?{' '}
                        <Link to="/register" className="text-primary font-semibold hover:text-accent transition-colors">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
