import { useState, useEffect } from 'react';
import { adminAPI } from '../../api/admin.api';
import Loader from '../../components/Loader';
import Badge from '../../components/Badge';
import './TodayOverview.css';

const TodayOverview = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTodayStatus();
    }, []);

    const fetchTodayStatus = async () => {
        try {
            const response = await adminAPI.getTodayStatus();

            if (response.statusCode === 200) {
                const { active = [], completed = [], absent = [] } = response.data;

                const formattedAgents = [
                    ...active.map(item => ({
                        _id: item.fieldAgent._id,
                        fullName: item.fieldAgent.fullName,
                        email: item.fieldAgent.email,
                        avatar: item.fieldAgent.avatar,
                        status: "ACTIVE",
                        isActive: true
                    })),
                    ...completed.map(item => ({
                        _id: item.fieldAgent._id,
                        fullName: item.fieldAgent.fullName,
                        email: item.fieldAgent.email,
                        avatar: item.fieldAgent.avatar,
                        status: "COMPLETED",
                        isActive: true 
                    })),
                    ...absent.map(agent => ({
                        _id: agent._id,
                        fullName: agent.fullName,
                        email: agent.email,
                        avatar: agent.avatar,
                        status: "ABSENT",
                        isActive: false
                    }))
                ];


                setAgents(formattedAgents);
            }
        } catch (err) {
            console.error('Error fetching today status:', err);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return <Loader message="Loading today's overview..." />;
    }

    const activeAgents = agents.filter(a => a.isActive).length;
    const totalAgents = agents.length;

    return (
        <div className="today-overview-page">
            <div className="page-header">
                <h1>Today's Overview</h1>
                <p className="page-subtitle">Real-time attendance status of all field agents</p>
            </div>

            <div className="overview-stats">
                <div className="stat-card">
                    <div className="stat-icon" style={{ color: 'var(--primary-blue)' }}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>
                    <div>
                        <p className="stat-label">Total Agents</p>
                        <p className="stat-value">{totalAgents}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ color: 'var(--primary-green)' }}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div>
                        <p className="stat-label">Active Today</p>
                        <p className="stat-value">{activeAgents}</p>
                    </div>
                </div>
            </div>

            <div className="card">
                <h2 className="card-title">Field Agents Status</h2>
                <div className="agents-list">
                    {agents.map((agent) => (
                        <div key={agent._id} className="agent-item">
                            <div className="agent-info-row">
                                <img
                                    src={agent.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.fullName)}`}
                                    alt={agent.fullName}
                                    className="agent-avatar"
                                />
                                <div className="agent-details">
                                    <h3 className="agent-name">{agent.fullName}</h3>
                                    <p className="agent-email">{agent.email}</p>
                                </div>
                                <Badge
                                    variant={
                                        agent.status === "ACTIVE"
                                            ? "success"
                                            : agent.status === "COMPLETED"
                                                ? "info"
                                                : "danger"
                                    }
                                >
                                    {agent.status === "ACTIVE"
                                        ? "Active"
                                        : agent.status === "COMPLETED"
                                            ? "Completed"
                                            : "Not Checked In"}
                                </Badge>

                            </div>
                        </div>
                    ))}
                </div>

                {agents.length === 0 && (
                    <div className="empty-state">
                        <p>No field agents registered yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodayOverview;
