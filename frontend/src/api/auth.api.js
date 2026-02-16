import axiosInstance from './axios';

export const authAPI = {

    login: async (email, password) => {
        const response = await axiosInstance.post('/user/login', {
            email,
            password,
        });
        return response.data;
    },

    logout: async () => {
        const response = await axiosInstance.post('/user/logout');
        return response.data;
    },

    getUser: async () => {
        const response = await axiosInstance.get('/user/getUser');
        return response.data;
    },

    updateAvatar: async (formData) => {
        const response = await axiosInstance.patch('/user/updateUserAvatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};
