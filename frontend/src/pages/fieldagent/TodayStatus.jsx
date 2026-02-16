import { useState, useEffect } from 'react';
import { attendanceAPI } from '../../api/attendance.api';
import ImageUpload from '../../components/ImageUpload';
import Badge from '../../components/Badge';
import Loader from '../../components/Loader';
import { formatTime, formatDuration } from '../../utils/timeFormatter';
import './TodayStatus.css';

const TodayStatus = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [checkInImage, setCheckInImage] = useState(null);
    const [checkOutImage, setCheckOutImage] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTodayStatus();
    }, []);

    const fetchTodayStatus = async () => {
        try {
            const response = await attendanceAPI.getTodayStatus();
            if (response.statusCode === 200) {
                setStatus(response.data);
            }
        } catch (err) {
            console.error('Error fetching today status:', err);
        } finally {
            setLoading(false);
        }
    };

    const getLocation = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                () => reject(new Error('Location permission denied'))
            );
        });
    };

    const handleCheckIn = async () => {
        if (!checkInImage) {
            setError('Please upload an image for check-in');
            return;
        }

        setError('');
        setActionLoading(true);

        try {
            const location = await getLocation();

            const response = await attendanceAPI.checkIn(
                checkInImage,
                location.latitude,
                location.longitude
            );

            if (response.statusCode === 201) {
                await fetchTodayStatus();
                setCheckInImage(null);
            }
        } catch (err) {
            setError(err.message || err.response?.data?.message || 'Check-in failed');
        } finally {
            setActionLoading(false);
        }
    };

    const handleCheckOut = async () => {
        if (!checkOutImage) {
            setError('Please upload an image for check-out');
            return;
        }

        setError('');
        setActionLoading(true);

        try {
            const location = await getLocation();

            const response = await attendanceAPI.checkOut(
                checkOutImage,
                location.latitude,
                location.longitude
            );

            if (response.statusCode === 200) {
                await fetchTodayStatus();
                setCheckOutImage(null);
            }
        } catch (err) {
            setError(err.message || err.response?.data?.message || 'Check-out failed');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return <Loader message="Loading today's status..." />;
    }

    const getStatusBadge = () => {
        if (!status) return null;

        switch (status.status) {
            case 'NOT_CHECKED_IN':
                return <Badge variant="gray">Not Checked In</Badge>;
            case 'ACTIVE':
                return <Badge variant="success">Active</Badge>;
            case 'COMPLETED':
                return <Badge variant="info">Completed</Badge>;
            case 'ABSENT':
                return <Badge variant="danger">Absent</Badge>;
            default:
                return <Badge variant="gray">{status.status}</Badge>;
        }
    };

    return (
        <div className="today-status-page">
            <div className="page-header">
                <h1>Today's Attendance</h1>
                <p className="page-subtitle">
                    Check in when you start your route, check out when you finish
                </p>
            </div>

            {error && (
                <div className="alert alert-error">
                    {error}
                </div>
            )}

            <div className="status-overview card">
                <div className="status-header">
                    <h2>Current Status</h2>
                    {getStatusBadge()}
                </div>

                {status &&
                    status.status !== 'NOT_CHECKED_IN' &&
                    status.status !== 'ABSENT' && (
                        <div className="status-details">
                            <div className="status-detail-item">
                                <span className="detail-label">Check-In Time:</span>
                                <span className="detail-value">
                                    {formatTime(status.checkIn)}
                                </span>
                            </div>
                            {status.checkOut && (
                                <div className="status-detail-item">
                                    <span className="detail-label">Check-Out Time:</span>
                                    <span className="detail-value">
                                        {formatTime(status.checkOut)}
                                    </span>
                                </div>
                            )}
                            <div className="status-detail-item">
                                <span className="detail-label">Duration:</span>
                                <span className="detail-value">
                                    {formatDuration(status.durationMinutes)}
                                </span>
                            </div>
                        </div>
                    )}
            </div>

            {status?.status === 'NOT_CHECKED_IN' && (
                <div className="card">
                    <h2 className="card-title">Check In</h2>
                    <p className="card-subtitle">
                        Upload your photo to check in and start your route
                    </p>
                    <ImageUpload
                        onImageSelect={setCheckInImage}
                        label="Upload Check-In Photo"
                    />
                    <button
                        className="btn btn-success btn-block"
                        onClick={handleCheckIn}
                        disabled={actionLoading || !checkInImage}
                    >
                        {actionLoading ? 'Checking In...' : 'Check In'}
                    </button>
                </div>
            )}

            {status?.status === 'ACTIVE' && (
                <div className="card">
                    <h2 className="card-title">Check Out</h2>
                    <p className="card-subtitle">
                        Upload your photo to check out and complete your route
                    </p>
                    <ImageUpload
                        onImageSelect={setCheckOutImage}
                        label="Upload Check-Out Photo"
                    />
                    <button
                        className="btn btn-primary btn-block"
                        onClick={handleCheckOut}
                        disabled={actionLoading || !checkOutImage}
                    >
                        {actionLoading ? 'Checking Out...' : 'Check Out'}
                    </button>
                </div>
            )}

            {status?.status === 'COMPLETED' && (
                <div className="completion-message">
                    <h3>Route Completed</h3>
                    <p>
                        You have successfully completed your delivery route for today.
                    </p>
                </div>
            )}

            {status?.status === 'ABSENT' && (
                <div className="completion-message">
                    <h3>Marked as Absent</h3>
                    <p>You are marked as absent for today.</p>
                </div>
            )}
        </div>
    );
};

export default TodayStatus;
