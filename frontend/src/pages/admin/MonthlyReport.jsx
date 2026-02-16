import { useState, useEffect } from 'react';
import { adminAPI } from '../../api/admin.api';
import Loader from '../../components/Loader';
import { getCurrentYearMonth, getMonthName, formatDuration } from '../../utils/timeFormatter';
import './MonthlyReport.css';

const MonthlyReport = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState(getCurrentYearMonth().year);
    const [month, setMonth] = useState(getCurrentYearMonth().month);

    useEffect(() => {
        fetchMonthlyReport();
    }, [year, month]);

    const fetchMonthlyReport = async () => {
        setLoading(true);
        try {
            const response = await adminAPI.getMonthlyReport(year, month);
            if (response.statusCode === 200) {
                setReportData(response.data);
            }
        } catch (err) {
            console.error('Error fetching monthly report:', err);
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

    return (
        <div className="monthly-report-page">
            <div className="page-header">
                <h1>Monthly Report</h1>
                <p className="page-subtitle">Attendance summary for all field agents</p>
            </div>

            <div className="card">
                <div className="month-selector">
                    <button className="btn btn-secondary" onClick={handlePreviousMonth}>
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

                {loading ? (
                    <Loader message="Loading monthly report..." />
                ) : (
                    <div className="report-table-container">
                        <table className="report-table">
                            <thead>
                                <tr>
                                    <th>Agent Name</th>
                                    <th>Email</th>
                                    <th>Present Days</th>
                                    <th>Absent Days</th>
                                    <th>Total Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.map((agent) => (
                                    <tr key={agent.agentId}>
                                        <td className="agent-name-cell">{agent.fullName}</td>
                                        <td className="email-cell">{agent.email}</td>
                                        <td className="present-cell">{agent.presentDays}</td>
                                        <td className="absent-cell">{agent.absentDays}</td>
                                        <td className="hours-cell">{formatDuration(agent.totalMinutes)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {reportData.length === 0 && (
                            <div className="empty-state">
                                <p>No attendance data for this month.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MonthlyReport;
