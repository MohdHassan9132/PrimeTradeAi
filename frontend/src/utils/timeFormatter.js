
export const formatTime = (isoString) => {
    if (!isoString) return '-';

    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutesStr} ${ampm}`;
};


export const formatDate = (isoString) => {
    if (!isoString) return '-';

    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

export const calculateDuration = (startISO, endISO) => {
    if (!startISO || !endISO) return '-';

    const start = new Date(startISO);
    const end = new Date(endISO);
    const diffMs = end - start;

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (hours === 0) return `${minutes}m`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}m`;
};

export const formatDuration = (minutes) => {
    if (!minutes || minutes === 0) return '0m';

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
};


export const getCurrentYearMonth = () => {
    const now = new Date();
    return {
        year: now.getFullYear(),
        month: now.getMonth() + 1, // JavaScript months are 0-indexed
    };
};


export const getMonthName = (month) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1] || '';
};

export const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
};
