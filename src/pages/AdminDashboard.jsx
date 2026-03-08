import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ users: 0, posts: 0 });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // API calls to completely random JSON placeholder MIMICKING real stats
        Promise.all([
            api.get('/users'),
            api.get('/posts')
        ]).then(([users, posts]) => {
            setStats({
                users: users.length,
                posts: posts.length
            });
        }).catch(console.error);
    }, []);

    const handleCreateAlert = async () => {
        setLoading(true);
        try {
            // POST API call using fetch wrapper
            await api.post('/posts', { title: 'New Global Maintenance Alert', body: 'System maintenance scheduled.', userId: 1 });
            alert('Success: Global Alert Created (POST)');
        } catch (err) {
            alert('Error creating alert');
        } finally {
            setLoading(false);
        }
    };

    const handlePurge = async () => {
        if (!window.confirm('Are you sure you want to purge inactive users?')) return;
        setLoading(true);
        try {
            // DELETE API call
            await api.delete('/posts/1');
            alert('Success: Inactive users purged (DELETE)');
        } catch (err) {
            alert('Error purging');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full animate-fade-in">
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">Admin Control Panel</h2>
                <p className="text-gray-500 mt-2 text-sm sm:text-base">Global platform management and user moderation view.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* KPI Card 1 */}
                <div className="bg-white p-6 rounded-3xl shadow-lg border-l-4 border-primary flex items-center justify-between hover:shadow-xl transition-shadow">
                    <div>
                        <p className="text-sm text-gray-500 font-semibold mb-1 uppercase tracking-wider">Total Users</p>
                        <h3 className="text-3xl font-bold text-dark">{stats.users}</h3>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-primary shadow-inner">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                </div>

                {/* KPI Card 2 */}
                <div className="bg-white p-6 rounded-3xl shadow-lg border-l-4 border-accent flex items-center justify-between hover:shadow-xl transition-shadow">
                    <div>
                        <p className="text-sm text-gray-500 font-semibold mb-1 uppercase tracking-wider">Active Moderation</p>
                        <h3 className="text-3xl font-bold text-dark">{stats.posts}</h3>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-primary shadow-inner">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="mt-10 bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-dark mb-6 border-b pb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Quick Actions (API Examples)
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        disabled={loading}
                        onClick={handleCreateAlert}
                        className="flex-1 py-3 px-6 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-opacity-90 active:scale-[0.98] transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        Create Global Alert (POST)
                    </button>

                    <button
                        disabled={loading}
                        onClick={handlePurge}
                        className="flex-1 py-3 px-6 bg-dark text-white font-bold rounded-xl shadow-md hover:bg-gray-800 active:scale-[0.98] transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        Purge Inactive Records (DELETE)
                    </button>
                </div>
            </div>
        </div>
    );
}
