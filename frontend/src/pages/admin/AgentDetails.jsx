import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminAPI } from '../../api/admin.api';
import Loader from '../../components/Loader';
import Badge from '../../components/Badge';
import AttendanceGrid from '../../components/AttendanceGrid';
import './AgentDetails.css';

const AgentDetails = () => {
    const { agentId } = useParams();
    const navigate = useNavigate();
    const [agent, setAgent] = useState(null);
    const [todayStatus, setTodayStatus] = useState(null);
    const [monthlyStatus, setMonthlyStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

useEffect(() => {
    if (!agentId) return;

    setAgent(null);
    setTodayStatus(null);
    setMonthlyStatus(null);
    setError('');

    fetchAgentDetails();
}, [agentId]);


const fetchAgentDetails = async () => {
    try {
        setLoading(true);

        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        const agentResponse = await adminAPI.getFieldAgentById(agentId);
        if (agentResponse.statusCode === 200) {
            setAgent(agentResponse.data);
        } else {
            setError('Agent not found');
            return;
        }

        const todayResponse = await adminAPI.getTodayStatusById(agentId);
        if (todayResponse.statusCode === 200) {
            setTodayStatus(todayResponse.data);
        }

        const monthlyResponse = await adminAPI.getMonthlyReportById(agentId, year, month);
        if (monthlyResponse.statusCode === 200) {
            setMonthlyStatus(monthlyResponse.data);
        }

    } catch (err) {
        console.error(err);
        setError('Failed to load agent details');
    } finally {
        setLoading(false);
    }
};


    if (loading) {
        return <Loader message="Loading agent details..." />;
    }

    if (error || !agent) {
        return (
            <div className="error-state">
                <h2>{error || 'Agent not found'}</h2>
                <button className="btn btn-primary" onClick={() => navigate('/admin/field-agents')}>
                    Back to Field Agents
                </button>
            </div>
        );
    }

    const renderMap = (location) => {
        if (!location || !location.latitude || !location.longitude) return null;

        const { latitude, longitude } = location;

        return (
            <div className="map-section">
                <iframe
                    title="location-map"
                    width="100%"
                    height="250"
                    style={{ border: 0, marginTop: '12px', borderRadius: '8px' }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                ></iframe>
            </div>
        );
    };

    return (
        <div className="agent-details-page">
            <div className="page-header">
                <button className="back-button" onClick={() => navigate('/admin/field-agents')}>
                    Back
                </button>
                <div>
                    <h1>Agent Details</h1>
                    <p className="page-subtitle">View attendance and performance</p>
                </div>
            </div>

            <div className="card agent-info-card">
                <div className="agent-header">
                    <img
                        src={agent.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.fullName)}`}
                        alt={agent.fullName}
                        className="agent-avatar-large"
                    />
                    <div className="agent-details">
                        <h2>{agent.fullName}</h2>
                        <p className="agent-email">{agent.email}</p>
                        <Badge variant={agent.isActive ? 'success' : 'danger'}>
                            {agent.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="card">
                <h2 className="card-title">Today's Status</h2>

                {todayStatus ? (
                    <div className="today-status-content">

                        <div className="status-grid">
                            <div className="status-item">
                                <span className="status-label">Status</span>
                                <Badge variant={
                                    todayStatus.status === 'ACTIVE' ? 'success' :
                                    todayStatus.status === 'COMPLETED' ? 'info' :
                                    todayStatus.status === 'NOT_CHECKED_IN' ? 'gray' :
                                    'danger'
                                }>
                                    {todayStatus.status}
                                </Badge>
                            </div>

                            {todayStatus.checkIn && (
                                <div className="status-item">
                                    <span className="status-label">Check-in Time</span>
                                    <span className="status-value">
                                        {new Date(todayStatus.checkIn).toLocaleTimeString()}
                                    </span>
                                </div>
                            )}

                            {todayStatus.checkOut && (
                                <div className="status-item">
                                    <span className="status-label">Check-out Time</span>
                                    <span className="status-value">
                                        {new Date(todayStatus.checkOut).toLocaleTimeString()}
                                    </span>
                                </div>
                            )}
                        </div>

                        {todayStatus.checkInImage && (
                            <div className="image-section">
                                <h3>Check-in Image</h3>
                                <img
                                    src={todayStatus.checkInImage}
                                    alt="Check-in"
                                    className="attendance-image"
                                />
                                {renderMap(todayStatus.checkInLocation)}
                            </div>
                        )}

                        {todayStatus.checkOutImage && (
                            <div className="image-section">
                                <h3>Check-out Image</h3>
                                <img
                                    src={todayStatus.checkOutImage}
                                    alt="Check-out"
                                    className="attendance-image"
                                />
                                {renderMap(todayStatus.checkOutLocation)}
                            </div>
                        )}

                    </div>
                ) : (
                    <div className="empty-state-small">
                        <p>No attendance record for today</p>
                    </div>
                )}
            </div>

            <div className="card">
                <h2 className="card-title">Monthly Summary</h2>

                {monthlyStatus ? (
                    <>
                        <div className="monthly-summary-grid">
                            <div className="summary-item">
                                <div className="summary-value success">
                                    {monthlyStatus.presentDays || 0}
                                </div>
                                <div className="summary-label">Days Present</div>
                            </div>

                            <div className="summary-item">
                                <div className="summary-value danger">
                                    {monthlyStatus.absentDays || 0}
                                </div>
                                <div className="summary-label">Days Absent</div>
                            </div>

                            <div className="summary-item">
                                <div className="summary-value primary">
                                    {monthlyStatus.totalMinutes || 0}
                                </div>
                                <div className="summary-label">Total Minutes</div>
                            </div>
                        </div>

                        <div style={{ marginTop: '24px' }}>
                            <AttendanceGrid
                                year={currentYear}
                                month={currentMonth}
                                attendanceData={monthlyStatus.dailyAttendance || []}
                                onDateClick={(date) => navigate(`/admin/agent/${agentId}/date/${date}`)}
                            />
                        </div>
                    </>
                ) : (
                    <div className="empty-state-small">
                        <p>No data available for this month</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgentDetails;
