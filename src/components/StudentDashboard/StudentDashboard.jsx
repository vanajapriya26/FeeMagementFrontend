// src/components/StudentDashboard/StudentDashboard.js

import React, { useState, useEffect } from 'react';
import '../../styles/global.css';
import { 
    FaUser, 
    FaMoneyBillWave, 
    FaCalendarAlt, 
    FaCreditCard, 
    FaQuestionCircle, 
    FaSignOutAlt, 
    FaSignInAlt,
    FaBars,
    FaTimes,
    FaBell
} from 'react-icons/fa';
import Profile from './Profile';
import FeePaymentStatus from './FeePaymentStatus';
import UpcomingPayments from './UpcomingPayments';
import PaymentOptions from './PaymentOptions';
import Support from './Support';
import Notifications from './Notifications';

const StudentDashboard = ({ student, payments, upcomingFees, isLoggedIn, onLogout }) => {
    const [activeSection, setActiveSection] = useState('profile');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Navigation items with icons
    const navItems = [
        { id: 'profile', label: 'Profile', icon: <FaUser /> },
        { id: 'feePaymentStatus', label: 'Fee Payment Status', icon: <FaMoneyBillWave /> },
        { id: 'upcomingPayments', label: 'Upcoming Payments', icon: <FaCalendarAlt /> },
        { id: 'paymentOptions', label: 'Payment Options', icon: <FaCreditCard /> },
        { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
        { id: 'support', label: 'Support', icon: <FaQuestionCircle /> }
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return <Profile student={student} />;
            case 'notifications':
                return <Notifications />;
            case 'feePaymentStatus':
                return <FeePaymentStatus payments={payments} />;
            case 'upcomingPayments':
                return <UpcomingPayments upcomingFees={upcomingFees} />;
            case 'paymentOptions':
                return <PaymentOptions />;
            case 'support':
                return <Support />;
            default:
                return <Profile student={student} />;
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
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 mb-8">
                <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to College Fee Management System</h1>
                    <p className="text-xl text-blue-100">Manage your fees and payments efficiently</p>
                </div>
            </div>

            {/* Sticky Navbar */}
            <nav className="sticky top-0 z-50 glass-effect mb-6 flex justify-between items-center p-4 mx-4 rounded-xl">

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                        <FaUser className="text-primary-color text-xl" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold gradient-text">Student Dashboard</h1>
                        <p className="text-sm text-secondary-color">Manage your academic finances</p>
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

export default StudentDashboard;