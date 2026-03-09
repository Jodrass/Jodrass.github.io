import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import NewAppointment from './pages/NewAppointment';
import AdminDashboard from './pages/AdminDashboard';
import MainLayout from './components/MainLayout';

// Componente para proteger rutas basadas en la autenticación y roles
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/user'} replace />;
  }

  return children;
};

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas bajo MainLayout */}
        <Route element={<MainLayout />}>
          {/* Redirección por defecto según el rol */}
          <Route path="/" element={
            user ? (
              <Navigate to={user.role === 'admin' ? '/admin' : '/user'} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } />

          <Route path="/user" element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <UserDashboard />
            </ProtectedRoute>
          } />

          <Route path="/new-appointment" element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <NewAppointment />
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
