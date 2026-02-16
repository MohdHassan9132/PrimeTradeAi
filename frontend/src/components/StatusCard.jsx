import './StatusCard.css';

const StatusCard = ({ title, value, icon, variant = 'default' }) => {
    return (
        <div className={`status-card status-card-${variant}`}>
            {icon && <div className="status-card-icon">{icon}</div>}
            <div className="status-card-content">
                <h3 className="status-card-title">{title}</h3>
                <p className="status-card-value">{value}</p>
            </div>
        </div>
    );
};

export default StatusCard;
