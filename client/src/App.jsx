import { Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminBookForm from './pages/AdminBookForm';

const Header = () => {
    const { user, logout } = useAuth();
    return (
        <header className="header">
            <div className="header-left">
                <span className="header-logo">Library</span>
                <nav className="main-nav">
                    <Link to="/">Каталог</Link>
                </nav>
            </div>
            <div className="header-right" style={{display:'flex', gap:'10px'}}>
                {user ? (
                    <>
                        <span style={{color:'white'}}>Привіт, {user.role}</span>
                        {user.role === 'admin' && (
                            <Link to="/admin/add" className="btn-login">Додати книгу</Link>
                        )}
                        <button onClick={logout} className="btn-register">Вихід</button>
                    </>
                ) : (
                    <>
                        {/* ✅ ДОДАНО: Кнопка Реєстрації */}
                        <Link to="/login" className="btn-login">Вхід</Link>
                        <Link to="/register" className="btn-register">Реєстрація</Link> 
                    </>
                )}
            </div>
        </header>
    );
};

function App() {
    return (
        <AuthProvider>
            <div className="app">
                <Header />
                
                <Routes>
                    {/* Публічні маршрути */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/book/:id" element={<div>Сторінка книги (TODO)</div>} />

                    {/* Захищені маршрути (Тільки Адмін) */}
                    <Route element={<ProtectedRoute requiredRole="admin" />}>
                        <Route path="/admin/add" element={<AdminBookForm />} />
                        <Route path="/admin/edit/:id" element={<AdminBookForm />} />
                    </Route>
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;