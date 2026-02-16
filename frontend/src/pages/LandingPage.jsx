import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">Attendance Management System</h1>
        <p className="landing-subtitle">
          Simple, structured attendance tracking for field teams and administrators.
        </p>

        <button className="landing-btn" onClick={handleRedirect}>
          {user ? 'Go to Dashboard' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Landing;
