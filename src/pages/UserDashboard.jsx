import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function UserDashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // API GET call using native fetch wrapper
        api.get('/users')
            .then(data => {
                // Just mock matching profiles limited to 6
                setUsers(data.slice(0, 6));
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="w-full h-full animate-fade-in">
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">Discover Matches</h2>
                <p className="text-gray-500 mt-2 text-sm sm:text-base">People you might be interested in based on your profile.</p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    {/* SVG loading spinner */}
                    <svg className="animate-spin h-10 w-10 text-primary" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {users.map((user) => (
                        <div key={user.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform md:hover:-translate-y-2 group cursor-pointer relative pb-4">
                            <div className="h-48 sm:h-56 md:h-64 bg-secondary flex items-center justify-center m-3 rounded-2xl overflow-hidden relative">
                                <svg className="w-20 h-20 text-accent group-hover:scale-110 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                {/* Overlay for heart icon hover effect */}
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <svg className="w-12 h-12 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="px-6 py-4">
                                <h3 className="font-bold text-xl text-dark mb-1">{user.name}</h3>
                                <p className="text-gray-500 text-sm mb-4">📍 {user.address?.city || 'Madrid, Spain'}</p>
                                <button className="w-full py-2.5 bg-secondary text-primary font-bold rounded-xl hover:bg-primary hover:text-white active:scale-95 transition-all duration-300 text-sm shadow-sm hover:shadow-md">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
