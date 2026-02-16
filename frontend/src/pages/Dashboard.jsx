import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="dashboard-page">
            <div className="page-header">
                <h1>Welcome back, {user?.fullName}!</h1>
                <p className="page-subtitle">
                    {user?.role === 'admin'
                        ? 'Monitor and manage your field operations'
                        : 'Track your attendance and performance'}
                </p>
            </div>

            <div className="dashboard-grid">
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">Quick Stats</h2>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-item">
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
                                <p className="stat-label">Status</p>
                                <p className="stat-value">{user?.isActive ? 'Active' : 'Inactive'}</p>
                            </div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon" style={{ color: 'var(--primary-blue)' }}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="stat-label">Role</p>
                                <p className="stat-value">{user?.role === 'admin' ? 'Administrator' : 'Field Agent'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">Quick Actions</h2>
                    </div>
                    <div className="actions-list">
                        {user?.role === 'admin' ? (
                            <>
                                <a href="/admin/field-agents" className="action-link">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    </svg>
                                    Manage Field Agents
                                </a>
                                <a href="/admin/today-overview" className="action-link">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                    View Today's Overview
                                </a>
                                <a href="/admin/monthly-report" className="action-link">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                    Monthly Report
                                </a>
                            </>
                        ) : (
                            <>
                                <a href="/attendance/today" className="action-link">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Check In/Out
                                </a>
                                <a href="/attendance/monthly" className="action-link">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    View Monthly Attendance
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
