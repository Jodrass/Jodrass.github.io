import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../services/api';

// Icono de cruz de farmacia SVG embebido
const PharmacyCross = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <rect x="9" y="2" width="6" height="20" rx="1.5" />
        <rect x="2" y="9" width="20" height="6" rx="1.5" />
    </svg>
);

export default function Register() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const onSubmit = async (data) => {
        setLoading(true);
        setApiError('');
        try {
            // Convertir fecha de nacimiento de YYYY-MM-DD (input date) a DD/MM/YYYY (API)
            let formattedDate = '';
            if (data.date) {
                const [y, m, d] = data.date.split('-');
                formattedDate = `${d}/${m}/${y}`;
            }

            await api.post('/register', {
                username: data.username,
                password: data.password,
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                date: formattedDate,
            });

            // Registro exitoso → ir a login
            navigate('/login', { state: { registered: true } });
        } catch (error) {
            setApiError(typeof error === 'string' ? error : 'Error al registrar el usuario.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-accent to-purple-900 p-4 py-10">
            <div className="w-full max-w-lg">
                <div className="bg-white rounded-3xl shadow-2xl shadow-primary/30 p-8 sm:p-10">
                    {/* Logo */}
                    <div className="text-center mb-7">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-white mb-3 shadow-lg shadow-primary/40">
                            <PharmacyCross />
                        </div>
                        <h2 className="text-2xl font-extrabold text-dark tracking-tight">Crear cuenta</h2>
                        <p className="text-gray-400 mt-1 text-sm">Únete a ClinicaJoyfe</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Grid para nombre y apellido */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1.5">Nombre</label>
                                <input
                                    {...register('name', { required: 'Obligatorio' })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark placeholder:text-gray-300"
                                    placeholder="Juan"
                                />
                                {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1.5">Apellido</label>
                                <input
                                    {...register('lastname', { required: 'Obligatorio' })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark placeholder:text-gray-300"
                                    placeholder="Pérez"
                                />
                                {errors.lastname && <span className="text-red-500 text-xs mt-1 block">{errors.lastname.message}</span>}
                            </div>
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1.5">Nombre de usuario</label>
                            <input
                                {...register('username', { required: 'Obligatorio', minLength: { value: 3, message: 'Mínimo 3 caracteres' } })}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark placeholder:text-gray-300"
                                placeholder="juanperez"
                                autoComplete="username"
                            />
                            {errors.username && <span className="text-red-500 text-xs mt-1 block">{errors.username.message}</span>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1.5">Correo electrónico</label>
                            <input
                                {...register('email', { required: 'Obligatorio', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' } })}
                                type="email"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark placeholder:text-gray-300"
                                placeholder="juan@email.com"
                                autoComplete="email"
                            />
                            {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
                        </div>

                        {/* Phone + Birth date */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1.5">Teléfono</label>
                                <input
                                    {...register('phone')}
                                    type="tel"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark placeholder:text-gray-300"
                                    placeholder="600 000 000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1.5">Fecha de nacimiento</label>
                                <input
                                    {...register('date')}
                                    type="date"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1.5">Contraseña</label>
                            <input
                                {...register('password', { required: 'Obligatorio', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
                                type="password"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark placeholder:text-gray-300"
                                placeholder="••••••••"
                                autoComplete="new-password"
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
                            className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-accent active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-2"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : 'Crear cuenta'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-400 mt-5">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="text-primary font-semibold hover:text-accent transition-colors">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
