import './AttendanceGrid.css';
import { getDaysInMonth } from '../utils/timeFormatter';

const AttendanceGrid = ({ year, month, attendanceData = [], onDateClick }) => {
    const daysInMonth = getDaysInMonth(year, month);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const attendanceMap = {};
    attendanceData.forEach((item) => {
        attendanceMap[item.day] = item.status;
    });

    return (
        <div className="attendance-grid-container">
            <div className="attendance-grid">
                {days.map((day) => {
                    const status = attendanceMap[day] || 'ABSENT';
                    const isPresent = status === 'PRESENT';
                    
                    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                    return (
                        <div
                            key={day}
                            className={`attendance-cell ${isPresent ? 'present' : 'absent'} ${onDateClick ? 'clickable' : ''}`}
                            title={`Day ${day}: ${status}`}
                            onClick={() => onDateClick && onDateClick(dateStr)}
                            style={{ cursor: onDateClick ? 'pointer' : 'default' }}
                        >
                            <span className="attendance-day">{day}</span>
                        </div>
                    );
                })}
            </div>
            <div className="attendance-legend">
                <div className="legend-item">
                    <div className="legend-box present"></div>
                    <span>Present</span>
                </div>
                <div className="legend-item">
                    <div className="legend-box absent"></div>
                    <span>Absent</span>
                </div>
            </div>
        </div>
    );
};

export default AttendanceGrid;
