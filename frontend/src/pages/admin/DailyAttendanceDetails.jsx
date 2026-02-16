import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminAPI } from '../../api/admin.api';
import Loader from '../../components/Loader';
import Badge from '../../components/Badge';
import './DailyAttendanceDetails.css';

const DailyAttendanceDetails = () => {
    const { agentId, date } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const response = await adminAPI.getDailyAttendanceById(agentId, date);
                if (response.statusCode === 200) {
                    setDetails(response.data);
                } else {
                    setError('Failed to fetch attendance details');
                }
            } catch (err) {
                console.error(err);
                setError('Error loading attendance details');
            } finally {
                setLoading(false);
            }
        };

        if (agentId && date) {
            fetchDetails();
        }
    }, [agentId, date]);

    if (loading) return <Loader message="Loading details..." />;

    if (error || !details) {
        return (
            <div className="error-state">
                <h2>{error || 'Details not found'}</h2>
                <button className="btn btn-primary" onClick={() => navigate(-1)}>
                    Go Back
                </button>
            </div>
        );
    }

    const renderMap = (location) => {
        if (!location || !location.latitude || !location.longitude) return null;
        const { latitude, longitude } = location;
        return (
            <div className="map-container">
                <iframe
                    title="location-map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                ></iframe>
            </div>
        );
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeStr) => {
        if (!timeStr) return '-';
        return new Date(timeStr).toLocaleTimeString();
    };

    const formatDuration = (minutes) => {
        if (!minutes) return '0h 0m';
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hrs}h ${mins}m`;
    };

    return (
        <div className="daily-attendance-page">
            <div className="page-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Back
                </button>
                <div style={{ flex: 1 }}>
                    <div className="agent-mini-profile">
                        <img 
                            src={details.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(details.fullName)}`} 
                            alt={details.fullName}
                            className="mini-avatar"
                        />
                        <div className="mini-info">
                            <h3>{details.fullName}</h3>
                            <p>{details.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="status-overview-card">
                <div className="status-header">
                    <div className="date-display">
                        {formatDate(details.date)}
                    </div>
                    <Badge variant={
                        details.status === 'COMPLETED' ? 'success' :
                        details.status === 'ACTIVE' ? 'info' :
                        details.status === 'NOT_CHECKED_IN' ? 'gray' : 'danger'
                    }>
                        {details.status}
                    </Badge>
                </div>

                <div className="attendance-details-grid">
                    <div className="detail-item">
                        <span className="detail-label">Check-in Time</span>
                        <span className="detail-value">{formatTime(details.checkIn)}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Check-out Time</span>
                        <span className="detail-value">{formatTime(details.checkOut)}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Duration</span>
                        <span className="detail-value">{formatDuration(details.durationMinutes)}</span>
                    </div>
                </div>

                {(details.checkInImage || details.checkOutImage) && (
                    <div className="attendance-images-grid">
                        {details.checkInImage && (
                            <div className="image-card">
                                <h3>Check-in Details</h3>
                                <img 
                                    src={details.checkInImage} 
                                    alt="Check-in" 
                                    className="attendance-photo"
                                    onClick={() => window.open(details.checkInImage, '_blank')}
                                    style={{cursor: 'pointer'}}
                                />
                                {renderMap(details.checkInLocation)}
                            </div>
                        )}
                        
                        {details.checkOutImage && (
                            <div className="image-card">
                                <h3>Check-out Details</h3>
                                <img 
                                    src={details.checkOutImage} 
                                    alt="Check-out" 
                                    className="attendance-photo"
                                    onClick={() => window.open(details.checkOutImage, '_blank')}
                                    style={{cursor: 'pointer'}}
                                />
                                {renderMap(details.checkOutLocation)}
                            </div>
                        )}
                    </div>
                )}
                
                {(!details.checkInImage && !details.checkOutImage) && (
                     <div className="empty-state-small" style={{marginTop: '2rem', textAlign: 'center', color: '#64748b'}}>
                        <p>No visual records available for this date.</p>
                     </div>
                )}
            </div>
        </div>
    );
};

export default DailyAttendanceDetails;
