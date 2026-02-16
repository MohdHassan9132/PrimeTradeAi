import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../api/admin.api';
import Loader from '../../components/Loader';
import Badge from '../../components/Badge';
import './FieldAgents.css';

const FieldAgents = () => {
    const navigate = useNavigate();
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        password: '',
    });
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        try {
            const response = await adminAPI.getAllFieldAgents();
            if (response.statusCode === 200) {
                setAgents(response.data);
            }
        } catch (err) {
            console.error('Error fetching agents:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setFormLoading(true);

        try {
            const response = await adminAPI.registerFieldAgent(
                formData.email,
                formData.fullName,
                formData.password
            );
            if (response.statusCode === 201) {
                setShowRegisterForm(false);
                setFormData({ email: '', fullName: '', password: '' });
                await fetchAgents();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setFormLoading(false);
        }
    };

    const handleToggleStatus = async (userId) => {
        try {
            await adminAPI.toggleFieldAgent(userId);
            await fetchAgents();
        } catch (err) {
            console.error('Error toggling agent status:', err);
        }
    };

    if (loading) {
        return <Loader message="Loading field agents..." />;
    }

    return (
        <div className="field-agents-page">
            <div className="page-header">
                <div>
                    <h1>Field Agents</h1>
                    <p className="page-subtitle">Manage your field agent team</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowRegisterForm(!showRegisterForm)}
                >
                    {showRegisterForm ? 'Cancel' : '+ Register New Agent'}
                </button>
            </div>

            {showRegisterForm && (
                <div className="card register-form">
                    <h2 className="card-title">Register New Field Agent</h2>

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

                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-input"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-input"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-success" disabled={formLoading}>
                            {formLoading ? 'Registering...' : 'Register Agent'}
                        </button>
                    </form>
                </div>
            )}

            <div className="agents-grid">
                {agents.map((agent) => (
                    <div key={agent._id} className="agent-card card">
                        <div className="agent-header">
                            <img
                                src={agent.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.fullName)}`}
                                alt={agent.fullName}
                                className="agent-avatar"
                            />
                            <div className="agent-info">
                                <h3 className="agent-name">{agent.fullName}</h3>
                                <p className="agent-email">{agent.email}</p>
                            </div>
                            <Badge variant={agent.isActive ? 'success' : 'danger'}>
                                {agent.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                        </div>

                        <div className="agent-actions">
                            <button
                                className={`btn btn-sm ${agent.isActive ? 'btn-danger' : 'btn-success'}`}
                                onClick={() => handleToggleStatus(agent._id)}
                            >
                                {agent.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                                className="btn btn-sm btn-secondary"
                                onClick={() => navigate(`/admin/agent/${agent._id}`)}
                            >
                                View Details
                            </button>
                            <button
                                className="btn btn-sm btn-warning"
                                onClick={() => navigate(`/admin/field-agents/change-password/${agent._id}`)}
                                style={{ marginLeft: '0.5rem', backgroundColor: '#f59e0b', color: 'white' }}
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {agents.length === 0 && (
                <div className="empty-state">
                    <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    <h3>No Field Agents Yet</h3>
                    <p>Register your first field agent to get started.</p>
                </div>
            )}
        </div>
    );
};

export default FieldAgents;
