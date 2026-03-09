import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Swal from 'sweetalert2';

const MySwal = Swal.mixin({
    customClass: {
        confirmButton: 'swal-btn-danger',
        cancelButton: 'swal-btn-cancel',
        popup: 'swal-popup',
    },
    buttonsStyling: false,
});

// Parsea una fecha "DD/MM/YYYY HH:mm:ss" y la convierte a objeto Date
const parseCitaDate = (dateStr) => {
    if (!dateStr) return null;
    const [datePart, timePart] = dateStr.split(' ');
    if (!datePart) return null;
    const [d, m, y] = datePart.split('/');
    const [h = '0', min = '0'] = (timePart || '').split(':');
    return new Date(+y, +m - 1, +d, +h, +min);
};

// Formatea fecha a texto legible en español
const formatDate = (dateObj) => {
    if (!dateObj) return '';
    return dateObj.toLocaleString('es-ES', {
        weekday: 'short', day: '2-digit', month: 'short',
        year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
};

// Calcula días de diferencia desde hoy
const getDaysFromNow = (dateObj) => {
    if (!dateObj) return null;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const d = new Date(dateObj);
    d.setHours(0, 0, 0, 0);
    return Math.round((d - now) / (1000 * 60 * 60 * 24));
};

const getBadge = (days) => {
    if (days < 0) return { label: 'Pasada', cls: 'bg-gray-100 text-gray-500' };
    if (days === 0) return { label: 'Hoy', cls: 'bg-green-100 text-green-700' };
    if (days === 1) return { label: 'Mañana', cls: 'bg-blue-100 text-blue-700' };
    if (days <= 7) return { label: `En ${days} días`, cls: 'bg-purple-100 text-purple-700' };
    return { label: `En ${days} días`, cls: 'bg-secondary text-primary' };
};

export default function UserDashboard() {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/date/getByUser')
            .then(data => {
                // Ordenar: primero las más próximas al día de hoy (futuras primero, luego pasadas)
                const sorted = [...data].sort((a, b) => {
                    const da = parseCitaDate(a.date);
                    const db = parseCitaDate(b.date);
                    const now = new Date();
                    const diffA = da ? da - now : Infinity;
                    const diffB = db ? db - now : Infinity;
                    // Citas futuras primero, ordenadas por las más cercanas
                    if (diffA >= 0 && diffB >= 0) return diffA - diffB;
                    if (diffA >= 0) return -1;
                    if (diffB >= 0) return 1;
                    return diffB - diffA; // pasadas: la más reciente primero
                });
                setCitas(sorted);
                setLoading(false);
            })
            .catch(err => {
                setError('No se pudieron cargar tus citas.');
                setLoading(false);
                console.error(err);
            });
    }, []);

    const handleCancel = async (cita) => {
        const result = await MySwal.fire({
            title: '¿Cancelar esta cita?',
            html: `<p class="text-gray-500 text-sm">Centro: <strong>${cita.center}</strong><br>Fecha: <strong>${cita.date}</strong></p>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, mantener',
            reverseButtons: true,
        });
        if (!result.isConfirmed) return;
        try {
            await api.post('/date/delete', { date: cita.date, center: cita.center });
            setCitas(prev => prev.filter(c => !(c.date === cita.date && c.center === cita.center)));
            MySwal.fire({
                title: 'Cita cancelada',
                text: 'Tu cita ha sido cancelada correctamente.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                customClass: { popup: 'swal-popup' },
            });
        } catch (err) {
            MySwal.fire({ title: 'Error', text: 'No se pudo cancelar la cita.', icon: 'error', customClass: { popup: 'swal-popup', confirmButton: 'swal-btn-primary' }, buttonsStyling: false });
        }
    };

    return (
        <div className="w-full animate-fade-in">
            {/* Cabecera */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">Mis Citas</h2>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base">
                        Ordenadas por proximidad al día de hoy
                    </p>
                </div>
                <button
                    onClick={() => navigate('/new-appointment')}
                    className="flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-accent active:scale-95 transition-all duration-200"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                    Nueva Cita
                </button>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <svg className="animate-spin h-10 w-10 text-primary" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="text-center text-red-500 bg-red-50 rounded-xl p-6">{error}</div>
            )}

            {/* Sin citas */}
            {!loading && !error && citas.length === 0 && (
                <div className="text-center py-20 flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-gray-500 text-lg font-medium">No tienes citas todavía</p>
                    <button
                        onClick={() => navigate('/new-appointment')}
                        className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-accent transition-all shadow-md shadow-primary/20"
                    >
                        Pedir tu primera cita
                    </button>
                </div>
            )}

            {/* Grid de citas */}
            {!loading && !error && citas.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {citas.map((cita, idx) => {
                        const dateObj = parseCitaDate(cita.date);
                        const days = getDaysFromNow(dateObj);
                        const badge = getBadge(days);
                        const isPast = days !== null && days < 0;

                        return (
                            <div
                                key={`${cita.date}-${cita.center}-${idx}`}
                                className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 ${isPast ? 'border-gray-200 opacity-70' : 'border-primary'}`}
                            >
                                {/* Header de la card */}
                                <div className={`px-5 pt-5 pb-3 flex items-start justify-between`}>
                                    <div className="flex-1">
                                        <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mb-2 ${badge.cls}`}>
                                            {badge.label}
                                        </span>
                                        <h3 className="font-bold text-dark text-base leading-tight">{cita.center}</h3>
                                    </div>
                                    <div className="ml-2 bg-secondary rounded-xl p-2 flex-shrink-0">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Fecha */}
                                <div className="px-5 pb-4 border-t border-gray-50">
                                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                                        <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="font-medium capitalize">{dateObj ? formatDate(dateObj) : cita.date}</span>
                                    </div>

                                    {/* Botón cancelar (solo si no es pasada) */}
                                    {!isPast && (
                                        <button
                                            onClick={() => handleCancel(cita)}
                                            className="mt-4 w-full py-2 border border-red-200 text-red-400 rounded-xl text-sm font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all active:scale-95"
                                        >
                                            Cancelar cita
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
