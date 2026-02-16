import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';

    return (
        <>
            {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <nav className="sidebar-nav">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        onClick={onClose}
                    >
                        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        Dashboard
                    </NavLink>

                    {!isAdmin && (
                        <>
                            <div className="nav-section">
                                <p className="nav-section-title">Attendance</p>
                                <NavLink
                                    to="/attendance/today"
                                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                                    onClick={onClose}
                                >
                                    <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Today Status
                                </NavLink>
                                <NavLink
                                    to="/attendance/monthly"
                                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                                    onClick={onClose}
                                >
                                    <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    Monthly Status
                                </NavLink>
                            </div>
                        </>
                    )}

                    {isAdmin && (
                        <>
                            <div className="nav-section">
                                <p className="nav-section-title">Management</p>
                                <NavLink
                                    to="/admin/field-agents"
                                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                                    onClick={onClose}
                                >
                                    <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    </svg>
                                    Field Agents
                                </NavLink>
                                <NavLink
                                    to="/admin/today-overview"
                                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                                    onClick={onClose}
                                >
                                    <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                    Today Overview
                                </NavLink>
                                <NavLink
                                    to="/admin/monthly-report"
                                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                                    onClick={onClose}
                                >
                                    <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                    Monthly Report
                                </NavLink>
                            </div>
                        </>
                    )}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
