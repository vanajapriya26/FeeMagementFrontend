// src/components/AdminDashboard/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import '../../styles/global.css';
import { 
    FaChartBar, 
    FaUserGraduate, 
    FaMoneyBillWave, 
    FaFileInvoiceDollar, 
    FaChartPie, 
    FaBell, 
    FaSignOutAlt, 
    FaSignInAlt,
    FaBars,
    FaTimes,
    FaCog
} from 'react-icons/fa';
import OverviewStatistics from './OverviewStatistics';
import StudentManagement from './StudentManagement';
import FeeManagement from './FeeManagement';
import PaymentTracking from './PaymentTracking';
import Reports from './Reports';
import NotificationManagement from './NotificationManagement';

const AdminDashboard = ({ isLoggedIn, onLogout }) => {
    const [activeSection, setActiveSection] = useState('overview');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Navigation items with icons
    const navItems = [
        { id: 'overview', label: 'Overview', icon: <FaChartBar /> },
        { id: 'studentManagement', label: 'Student Management', icon: <FaUserGraduate /> },
        { id: 'feeManagement', label: 'Fee Management', icon: <FaMoneyBillWave /> },
        { id: 'paymentTracking', label: 'Payment Tracking', icon: <FaFileInvoiceDollar /> },
        { id: 'reports', label: 'Reports', icon: <FaChartPie /> },
        { id: 'notifications', label: 'Notifications', icon: <FaBell /> }
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return <OverviewStatistics />;
            case 'studentManagement':
                return <StudentManagement />;
            case 'feeManagement':
                return <FeeManagement />;
            case 'paymentTracking':
                return <PaymentTracking />;
            case 'reports':
                return <Reports />;
            case 'notifications':
                return <NotificationManagement />;
            default:
                return <OverviewStatistics />;
        }
    };

    const NavButton = ({ item, isMobile = false }) => (
        <button
            onClick={() => {
                setActiveSection(item.id);
                if (isMobile) setIsMenuOpen(false);
            }}
            className={`py-3 px-6 rounded-xl flex items-center gap-3 transition-all duration-300 w-full font-medium
                ${activeSection === item.id 
                    ? 'button-primary' 
                    : 'text-secondary-color hover:bg-blue-50'}`}
        >
            {item.icon}
            <span>{item.label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-12 px-6 mb-8">
                <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
                    <h1 className="text-3xl font-bold mb-3">Admin Control Panel</h1>
                    
                </div>
            </div>

            {/* Sticky Navbar */}
            <nav className="sticky top-0 z-50 glass-effect mb-6 flex justify-between items-center p-4 mx-4 rounded-xl">

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                        <FaCog className="text-primary-color text-xl animate-spin-slow" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold gradient-text">Admin Dashboard</h1>
                        <p className="text-sm text-secondary-color">Manage system settings and users</p>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-gray-600 hover:text-primary-color focus:outline-none transition-colors duration-200"
                >
                    {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                </button>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center space-x-4">
                    {navItems.map(item => (
                        <li key={item.id}>
                            <NavButton item={item} />
                        </li>
                    ))}
                    <li>
                        {isLoggedIn ? (
                            <button
                                onClick={onLogout}
                                className="py-2 px-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => console.log('Redirect to Login')}
                                className="py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                            >
                                <FaSignInAlt />
                                Login
                            </button>
                        )}
                    </li>
                </ul>
            </nav>

            {/* Content Area with its own scroll */}
            <div className="p-4 md:p-6">
                <div className="bg-white rounded-lg shadow-md p-6 overflow-auto">
                    {renderContent()}
                </div>
            </div>

            {/* Mobile Menu Overlay - keep z-index higher than navbar */}
            <div 
                className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity md:hidden
                    ${isMenuOpen ? 'opacity-100 z-60' : 'opacity-0 pointer-events-none'}`} 
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Side Menu - keep z-index higher than overlay */}
            <div 
                className={`fixed left-0 top-0 w-64 bg-white shadow-lg h-full transform transition-transform md:hidden z-70
                    ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Menu</h2>
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 text-gray-600 hover:text-gray-800"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>
                <ul className="flex flex-col p-4 space-y-2">
                    {navItems.map(item => (
                        <li key={item.id}>
                            <NavButton item={item} isMobile={true} />
                        </li>
                    ))}
                    <li>
                        {isLoggedIn ? (
                            <button
                                onClick={() => { onLogout(); setIsMenuOpen(false); }}
                                className="py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 w-full flex items-center gap-2"
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => { console.log('Redirect to Login'); setIsMenuOpen(false); }}
                                className="py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 w-full flex items-center gap-2"
                            >
                                <FaSignInAlt />
                                Login
                            </button>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;