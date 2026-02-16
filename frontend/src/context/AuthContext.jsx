import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/auth.api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

import { useRef } from 'react';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false);

    useEffect(() => {
    console.log("AuthContext mounted");

    if (hasFetched.current) {
        console.log("AuthContext skipped due to hasFetched");
        return;
    }

    hasFetched.current = true;

    const fetchUser = async () => {
        console.log("Calling getUser...");

        try {
            const response = await authAPI.getUser();
            console.log("getUser response:", response);

            if (response.statusCode === 200) {
                console.log("User set");
                setUser(response.data);
            }
        } catch (error) {
            console.log("getUser error:", error?.response?.status);

            if (error.response?.status === 401) {
                console.log("User unauthorized → setting user null");
                setUser(null);
            }
        } finally {
            console.log("Setting loading to false");
            setLoading(false);
        }
    };

    fetchUser();
}, []);

useEffect(() => {
    console.log("Auth state changed →", { user, loading });
}, [user, loading]);


    const login = async (email, password) => {
        try {
            const response = await authAPI.login(email, password);
            if (response.statusCode === 200) {
                setUser(response.data);
                return { success: true };
            }
            return { success: false, message: response.message };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed',
            };
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            window.location.href = '/login';
        }
    };

    const updateUserAvatar = async (imageFile) => {
        try {
            const response = await authAPI.updateAvatar(imageFile);
            if (response.statusCode === 200) {
                setUser((prev) => ({
                    ...prev,
                    avatar: response.data,
                }));
                return { success: true };
            }
            return { success: false, message: response.message };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Avatar update failed',
            };
        }
    };

    const value = {
        user,
        loading,
        login,
        logout,
        updateUserAvatar,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
