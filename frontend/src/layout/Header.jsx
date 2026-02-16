import AvatarDropdown from './AvatarDropdown';
import './Header.css';

const Header = ({ onToggleSidebar }) => {
    return (
        <header className="header">
            <div className="header-left">
                <button
                    className="burger-button"
                    onClick={onToggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <svg
                        className="burger-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
                <div className="header-brand">
                    <div className="brand-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.5 3.09L15 5.5 10.5 3.09 6 5.5 1.5 3.09V20.91L6 18.5 10.5 20.91 15 18.5 19.5 20.91 24 18.5V3.09L19.5 5.5V3.09M6 7.5V16.5L4.5 17.25V8.25L6 7.5M13.5 7.5V16.5L12 17.25L10.5 16.5V7.5L12 6.75L13.5 7.5M19.5 7.5V16.5L18 17.25V8.25L19.5 7.5Z" />
                        </svg>
                    </div>
                    <h1 className="brand-title">Attendance Management System</h1>
                </div>
            </div>
            <div className="header-right">
                <AvatarDropdown />
            </div>
        </header>
    );
};

export default Header;
