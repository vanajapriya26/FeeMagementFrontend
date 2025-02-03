// src/components/StudentDashboard/StudentDashboard.js

import React, { useState } from 'react';
import { 
    FaUser, 
    FaMoneyBillWave, 
    FaCalendarAlt, 
    FaCreditCard, 
    FaQuestionCircle, 
    FaSignOutAlt, 
    FaSignInAlt,
    FaBars,
    FaTimes
} from 'react-icons/fa';
import Profile from './Profile';
import FeePaymentStatus from './FeePaymentStatus';
import UpcomingPayments from './UpcomingPayments';
import PaymentOptions from './PaymentOptions';
import Support from './Support';

const StudentDashboard = ({ student, payments, upcomingFees, isLoggedIn, onLogout }) => {
    const [activeSection, setActiveSection] = useState('profile');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Navigation items with icons
    const navItems = [
        { id: 'profile', label: 'Profile', icon: <FaUser /> },
        { id: 'feePaymentStatus', label: 'Fee Payment Status', icon: <FaMoneyBillWave /> },
        { id: 'upcomingPayments', label: 'Upcoming Payments', icon: <FaCalendarAlt /> },
        { id: 'paymentOptions', label: 'Payment Options', icon: <FaCreditCard /> },
        { id: 'support', label: 'Support', icon: <FaQuestionCircle /> }
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return <Profile student={student} />;
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
                    <FaUser className="text-blue-500 text-2xl" />
                    <h1 className="text-2xl font-bold">Student Dashboard</h1>
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

export default StudentDashboard;