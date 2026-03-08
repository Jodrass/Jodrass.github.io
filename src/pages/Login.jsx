import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        // Simulating API call since we don't have a real backend connected yet
        setTimeout(() => {
            // Mock logic: if email contains 'admin', assign admin role
            const role = data.email.includes('admin') ? 'admin' : 'user';
            login({ id: Date.now(), name: data.email.split('@')[0], role });
            setLoading(false);
            navigate(role === 'admin' ? '/admin' : '/user');
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary to-primary p-4 sm:p-6 md:p-8">
            {/* 
        Responsive constraints required by project: 
        xs: 480px, sm: 510px, md: 767px, lg: 990px, xl: 1920px 
      */}
            <div className="w-full max-w-[480px] sm:max-w-[510px] md:max-w-[767px] lg:max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 transform transition-all duration-500 hover:scale-[1.01]">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white mb-4 shadow-lg shadow-primary/30">
                        {/* SVG No icons library */}
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-dark tracking-tight">Welcome Back</h2>
                    <p className="text-gray-500 mt-2 text-sm sm:text-base">Find your perfect match today</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="juan@example.com (use admin@ for admin)"
                        />
                        {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                        <input
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                            type="password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="••••••••"
                        />
                        {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-opacity-90 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
