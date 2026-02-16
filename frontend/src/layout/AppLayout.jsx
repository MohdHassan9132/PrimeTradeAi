import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './AppLayout.css';

const AppLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
