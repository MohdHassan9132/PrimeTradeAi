import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AvatarDropdown.css';

const AvatarDropdown = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
    };

    const handleUpdateAvatar = () => {
        setIsOpen(false);
        navigate('/update-avatar');
    };

    return (
        <div className="avatar-dropdown" ref={dropdownRef}>
            <button
                className="avatar-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="User menu"
            >
                <img
                    src={user?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.fullName || 'User')}
                    alt={user?.fullName}
                    className="avatar-image"
                />
            </button>

            {isOpen && (
                <div className="dropdown-menu">
                    <div className="dropdown-header">
                        <p className="dropdown-name">{user?.fullName}</p>
                        <p className="dropdown-email">{user?.email}</p>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={handleUpdateAvatar}>
                        <svg
                            className="dropdown-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        Update Avatar
                    </button>
                    <button className="dropdown-item" onClick={handleLogout}>
                        <svg
                            className="dropdown-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default AvatarDropdown;
