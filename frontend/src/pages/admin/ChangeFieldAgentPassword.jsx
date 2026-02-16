import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminAPI } from '../../api/admin.api';
import Loader from '../../components/Loader';
import './ChangeFieldAgentPassword.css';

const ChangeFieldAgentPassword = () => {
    const { agentId } = useParams();
    const navigate = useNavigate();
    
    const [agent, setAgent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newPassword, setNewPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchAgentDetails();
    }, [agentId]);

    const fetchAgentDetails = async () => {
        try {
            const response = await adminAPI.getFieldAgentById(agentId);
            if (response.statusCode === 200) {
                setAgent(response.data);
            } else {
                setError('Failed to load agent details');
            }
        } catch (err) {
            console.error('Error fetching agent:', err);
            setError('Error loading agent details');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setSubmitting(true);

        try {
            const response = await adminAPI.changeFieldAgentPassword(agentId, newPassword);
            if (response.statusCode === 200) {
                setSuccess('Password updated successfully');
                setNewPassword('');
                setTimeout(() => {
                    navigate('/admin/field-agents');
                }, 2000);
            }
        } catch (err) {
            console.error('Error updating password:', err);
            setError(err.response?.data?.message || 'Failed to update password');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <Loader message="Loading agent details..." />;

    if (!agent && !loading) {
        return (
            <div className="change-password-page">
                <div className="alert alert-error">Agent not found</div>
                <button className="btn btn-secondary mt-4" onClick={() => navigate('/admin/field-agents')}>
                    Back to Field Agents
                </button>
            </div>
        );
    }

    return (
        <div className="change-password-page">
            <div className="page-header">
                <div>
                    <h1>Change Password</h1>
                    <p className="page-subtitle">Update password for {agent.fullName}</p>
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/admin/field-agents')}>
                    Cancel
                </button>
            </div>

            <div className="change-password-container">
                <div className="agent-info-summary">
                    <img
                        src={agent.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.fullName)}`}
                        alt={agent.fullName}
                        className="agent-info-avatar"
                    />
                    <div className="agent-info-text">
                        <h3>{agent.fullName}</h3>
                        <p>{agent.email}</p>
                    </div>
                </div>

                {error && (
                    <div className="alert alert-error mb-4">
                        <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </div>
                )}

                {success && (
                    <div className="alert alert-success mb-4">
                        <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={() => navigate('/admin/field-agents')}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={submitting}
                        >
                            {submitting ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeFieldAgentPassword;
