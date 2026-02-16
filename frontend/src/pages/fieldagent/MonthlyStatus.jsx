import { useState, useEffect } from 'react';
import { attendanceAPI } from '../../api/attendance.api';
import AttendanceGrid from '../../components/AttendanceGrid';
import Loader from '../../components/Loader';
import { getCurrentYearMonth, getMonthName } from '../../utils/timeFormatter';
import './MonthlyStatus.css';

const MonthlyStatus = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState(getCurrentYearMonth().year);
    const [month, setMonth] = useState(getCurrentYearMonth().month);

    useEffect(() => {
        fetchMonthlyStatus();
    }, [year, month]);

    const fetchMonthlyStatus = async () => {
        setLoading(true);
        try {
            const response = await attendanceAPI.getMonthlyStatus(year, month);
            if (response.statusCode === 200) {
                setAttendanceData(response.data);
            }
        } catch (err) {
            console.error('Error fetching monthly status:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePreviousMonth = () => {
        if (month === 1) {
            setMonth(12);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const handleNextMonth = () => {
        const current = getCurrentYearMonth();
        if (year === current.year && month === current.month) {
            return;
        }

        if (month === 12) {
            setMonth(1);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    const isCurrentMonth = () => {
        const current = getCurrentYearMonth();
        return year === current.year && month === current.month;
    };

    const presentDays = attendanceData.filter(d => d.status === 'PRESENT').length;
    const absentDays = attendanceData.filter(d => d.status === 'ABSENT').length;

    return (
        <div className="monthly-status-page">
            <div className="page-header">
                <h1>Monthly Attendance</h1>
                <p className="page-subtitle">View your attendance record for the month</p>
            </div>

            <div className="card">
                <div className="month-selector">
                    <button
                        className="btn btn-secondary"
                        onClick={handlePreviousMonth}
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <h2 className="month-title">
                        {getMonthName(month)} {year}
                    </h2>

                    <button
                        className="btn btn-secondary"
                        onClick={handleNextMonth}
                        disabled={isCurrentMonth()}
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                <div className="summary-stats">
                    <div className="summary-item">
                        <span className="summary-label">Present Days:</span>
                        <span className="summary-value present">{presentDays}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Absent Days:</span>
                        <span className="summary-value absent">{absentDays}</span>
                    </div>
                </div>

                {loading ? (
                    <Loader message="Loading attendance data..." />
                ) : (
                    <AttendanceGrid year={year} month={month} attendanceData={attendanceData} />
                )}
            </div>
        </div>
    );
};

export default MonthlyStatus;
