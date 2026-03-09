import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Swal from 'sweetalert2';

// Genera las opciones de hora en punto (09:00 - 20:00)
const HOURS = Array.from({ length: 12 }, (_, i) => {
    const h = (i + 9).toString().padStart(2, '0');
    return { value: `${h}:00:00`, label: `${h}:00` };
});

// Instancia de Swal con el tema de la app
const MySwal = Swal.mixin({
    customClass: {
        confirmButton: 'swal-btn-primary',
        cancelButton: 'swal-btn-cancel',
        popup: 'swal-popup',
    },
    buttonsStyling: false,
});

export default function NewAppointment() {
    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingCenters, setLoadingCenters] = useState(true);
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    const [form, setForm] = useState({
        center: '',
        date: '',
        hour: '09:00:00',
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        api.get('/centers')
            .then(data => {
                setCenters(data);
                if (data.length > 0) setForm(f => ({ ...f, center: data[0].name }));
            })
            .catch(() => { })
            .finally(() => setLoadingCenters(false));
    }, []);

    const validate = () => {
        const errs = {};
        if (!form.center) errs.center = 'Selecciona un centro';
        if (!form.date) errs.date = 'Selecciona una fecha';
        else {
            const selected = new Date(form.date + 'T00:00:00');
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selected < today) errs.date = 'La fecha no puede ser en el pasado';
        }
        if (!form.hour) errs.hour = 'Selecciona una hora';
        return errs;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
        setFormErrors(e => ({ ...e, [name]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }

        setLoading(true);
        setApiError('');
        try {
            const [y, m, d] = form.date.split('-');
            const apiDate = `${d}/${m}/${y} ${form.hour}`;

            await api.post('/date/create', {
                center: form.center,
                date: apiDate,
            });

            // SweetAlert2: éxito
            await MySwal.fire({
                title: '¡Cita confirmada!',
                html: `Tu cita en <strong>${form.center}</strong><br>el <strong>${d}/${m}/${y}</strong> a las <strong>${form.hour.slice(0, 5)}</strong><br>ha sido reservada con éxito.`,
                icon: 'success',
                confirmButtonText: 'Ver mis citas',
                showCancelButton: true,
                cancelButtonText: 'Pedir otra',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/user');
                } else {
                    setForm(f => ({ ...f, date: '', hour: '09:00:00' }));
                }
            });

        } catch (err) {
            setApiError(typeof err === 'string' ? err : 'Error al crear la cita. La franja puede estar ocupada.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            {/* Cabecera */}
            <div className="mb-8">
                <button
                    onClick={() => navigate('/user')}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary mb-3 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver a mis citas
                </button>
                <h2 className="text-3xl font-extrabold text-dark tracking-tight">Nueva Cita</h2>
                <p className="text-gray-500 mt-1 text-sm">Reserva tu próxima consulta médica</p>
            </div>

            {/* Formulario */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-t-4 border-primary">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Centro */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1.5">
                            Centro médico
                        </label>
                        {loadingCenters ? (
                            <div className="h-12 rounded-xl bg-gray-100 animate-pulse" />
                        ) : (
                            <div className="relative">
                                <select
                                    name="center"
                                    value={form.center}
                                    onChange={handleChange}
                                    className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark bg-white cursor-pointer hover:border-primary"
                                >
                                    {centers.map(c => (
                                        <option key={c.name} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                                {/* Flecha personalizada */}
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        )}
                        {centers.find(c => c.name === form.center) && (
                            <p className="text-xs text-gray-400 mt-1.5 pl-1">
                                📍 {centers.find(c => c.name === form.center)?.address}
                            </p>
                        )}
                        {formErrors.center && <span className="text-red-500 text-xs mt-1 block">{formErrors.center}</span>}
                    </div>

                    {/* Fecha — el calendario se abre hacia la derecha con direction:rtl */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1.5">
                            Fecha
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            style={{ direction: 'rtl' }}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark hover:border-primary"
                        />
                        {formErrors.date && <span className="text-red-500 text-xs mt-1 block">{formErrors.date}</span>}
                    </div>

                    {/* Hora */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1.5">
                            Hora
                        </label>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                            {HOURS.map(h => (
                                <button
                                    type="button"
                                    key={h.value}
                                    onClick={() => { setForm(f => ({ ...f, hour: h.value })); setFormErrors(e => ({ ...e, hour: undefined })); }}
                                    className={`py-2 rounded-xl text-sm font-semibold border transition-all active:scale-95 ${form.hour === h.value
                                        ? 'bg-primary text-white border-primary shadow shadow-primary/20'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                                        }`}
                                >
                                    {h.label}
                                </button>
                            ))}
                        </div>
                        {formErrors.hour && <span className="text-red-500 text-xs mt-1 block">{formErrors.hour}</span>}
                    </div>

                    {/* API Error */}
                    {apiError && (
                        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                            ⚠️ {apiError}
                        </div>
                    )}

                    {/* Resumen previo */}
                    {form.date && form.center && form.hour && (
                        <div className="bg-secondary rounded-xl p-4 text-sm text-primary font-medium">
                            📅 <strong>{form.date.split('-').reverse().join('/')}</strong> a las <strong>{form.hour.slice(0, 5)}</strong> en <strong>{form.center}</strong>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading || loadingCenters}
                        className="w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-accent active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Confirmar cita
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Estilos para SweetAlert2 con el tema de la app */}
            <style>{`
                .swal-popup { border-radius: 1.25rem !important; padding: 2rem !important; font-family: inherit !important; }
                .swal-btn-primary { background: #7c3aed; color: white; font-weight: 700; padding: 0.65rem 1.5rem; border-radius: 0.75rem; border: none; cursor: pointer; transition: background 0.2s; margin: 0 0.3rem; }
                .swal-btn-primary:hover { background: #a855f7; }
                .swal-btn-cancel { background: #f3e8ff; color: #7c3aed; font-weight: 700; padding: 0.65rem 1.5rem; border-radius: 0.75rem; border: none; cursor: pointer; transition: background 0.2s; margin: 0 0.3rem; }
                .swal-btn-cancel:hover { background: #e9d5ff; }
            `}</style>
        </div>
    );
}
