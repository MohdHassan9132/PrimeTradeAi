import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message || 'Login failed. Please try again.');
        }

        setLoading(false);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <div className="login-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.5 3.09L15 5.5 10.5 3.09 6 5.5 1.5 3.09V20.91L6 18.5 10.5 20.91 15 18.5 19.5 20.91 24 18.5V3.09L19.5 5.5V3.09M6 7.5V16.5L4.5 17.25V8.25L6 7.5M13.5 7.5V16.5L12 17.25L10.5 16.5V7.5L12 6.75L13.5 7.5M19.5 7.5V16.5L18 17.25V8.25L19.5 7.5Z" />
                        </svg>
                    </div>
                    <h1 className="login-title">Attendance Managment System</h1>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="alert alert-error">
                            <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="form-input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="form-input"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Managing Attendance</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
