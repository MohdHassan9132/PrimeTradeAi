import axiosInstance from './axios';

export const adminAPI = {
    
    getAllFieldAgents: async () => {
        const response = await axiosInstance.get('/admin/getAllFieldAgentsProfile');
        return response.data;
    },

    getFieldAgentById: async (userId) => {
        const response = await axiosInstance.get(`/admin/getFieldAgentProfileById/${userId}`);
        return response.data;
    },

    
    registerFieldAgent: async (email, fullName, password, imageFile = null) => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('fullName', fullName);
        formData.append('password', password);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        const response = await axiosInstance.post('/admin/registerFieldAgent', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    
    changeFieldAgentPassword: async (userId, newPassword) => {
        const response = await axiosInstance.post(
            `/admin/changeFieldAgentPassword/${userId}`,
            { newPassword }
        );
        return response.data;
    },

    
    toggleFieldAgent: async (userId) => {
        const response = await axiosInstance.post(`/admin/toggleFieldAgent/${userId}`);
        return response.data;
    },


    getMonthlyReport: async (year, month) => {
        const response = await axiosInstance.get(
            `/admin/getMontlyReport?year=${year}&month=${month}`
        );
        return response.data;
    },


    getTodayStatus: async () => {
        const response = await axiosInstance.get('/admin/getTodayStatus');
        return response.data;
    },

    getMonthlyReportById: async (userId, year, month) => {
        const response = await axiosInstance.get(
            `/admin/getMonthlyReportById/${userId}?year=${year}&month=${month}`
        );
        return response.data;
    },

    getTodayStatusById: async (userId) => {
        const response = await axiosInstance.get(`/admin/getTodayStatusById/${userId}`);
        return response.data;
    },

    getDailyAttendanceById: async (userId, date) => {
        const response = await axiosInstance.get(`/admin/getDailyAttendanceById/${userId}?date=${date}`);
        return response.data;
    },
};
