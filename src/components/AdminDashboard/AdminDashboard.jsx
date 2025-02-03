// src/components/AdminDashboard/AdminDashboard.js

import React, { useState } from 'react';
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
import Notifications from './Notifications';

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
                return <Notifications />;
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
            className={`py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-200 w-full
                ${activeSection === item.id 
                    ? 'bg-blue-500 text-white' 
                    : 'text-blue-500 hover:bg-blue-100'}`}
        >
            {item.icon}
            <span>{item.label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sticky Navbar */}
            <nav className="sticky top-0 z-50 bg-white shadow-md rounded-lg mb-6 flex justify-between items-center p-4">
                <div className="flex items-center gap-2">
                    <FaCog className="text-blue-500 text-2xl" />
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-gray-600 focus:outline-none"
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
                                className="py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
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