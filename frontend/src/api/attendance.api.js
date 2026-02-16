import axiosInstance from './axios';

export const attendanceAPI = {

    checkIn: async (imageFile, latitude, longitude) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);

        const response = await axiosInstance.post('/attendance/checkIn', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    },

    checkOut: async (imageFile, latitude, longitude) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);

        const response = await axiosInstance.patch('/attendance/checkOut', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    },

    getTodayStatus: async () => {
        const response = await axiosInstance.get('/attendance/getMyTodayStatus');
        return response.data;
    },

    getMonthlyStatus: async (year, month) => {
        const response = await axiosInstance.get(
            `/attendance/getMyMonthlyStatus?year=${year}&month=${month}`
        );
        return response.data;
    },
};
