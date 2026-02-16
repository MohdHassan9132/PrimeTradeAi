import './Unauthorized.css';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div className="unauthorized-page">
            <div className="unauthorized-content">
                <div className="unauthorized-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                </div>
                <h1>Access Denied</h1>
                <p>You don't have permission to access this page.</p>
                <Link to="/dashboard" className="btn btn-primary">
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default Unauthorized;
