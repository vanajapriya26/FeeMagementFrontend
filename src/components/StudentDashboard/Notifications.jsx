import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaCheckCircle, FaExclamationCircle, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import { useFee } from '../../context/FeeContext';

const Notifications = () => {
    const { notifications, markNotificationAsRead, deleteNotification } = useFee();
    const [showAll, setShowAll] = useState(false);
    const [filter, setFilter] = useState('all'); // 'all', 'admin', 'payment'

    const filteredNotifications = notifications.filter(notification => {
        if (filter === 'admin') return notification.fromAdmin;
        if (filter === 'payment') return !notification.fromAdmin;
        return true;
    });

    const handleMarkAsRead = (id) => {
        markNotificationAsRead(id);
    };

    const handleDelete = (id) => {
        deleteNotification(id);
    };

    const getNotificationStyle = (notification) => {
        const { type, priority } = notification;
        if (type === 'urgent' || priority === 'high') return 'border-red-200 bg-red-50';
        if (type === 'warning' || priority === 'normal') return 'border-yellow-200 bg-yellow-50';
        return 'border-blue-200 bg-blue-50';
    };

    const getIcon = (notification) => {
        const { type, priority, fromAdmin } = notification;
        if (fromAdmin) return <FaBell className="text-blue-500" />;
        if (type === 'urgent' || priority === 'high') return <FaExclamationCircle className="text-red-500" />;
        if (type === 'warning' || priority === 'normal') return <FaCalendarAlt className="text-yellow-500" />;
        return <FaCheckCircle className="text-blue-500" />;
    };

    const displayedNotifications = showAll ? filteredNotifications : filteredNotifications.slice(0, 3);
    const unreadCount = filteredNotifications.filter(n => !n.read).length;

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <FaBell className="text-2xl text-blue-500" />
                    <h2 className="text-xl font-semibold">Notifications</h2>
                    {unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                            {unreadCount} new
                        </span>
                    )}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1 rounded-lg ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('admin')}
                        className={`px-3 py-1 rounded-lg ${filter === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    >
                        Admin
                    </button>
                    <button
                        onClick={() => setFilter('payment')}
                        className={`px-3 py-1 rounded-lg ${filter === 'payment' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    >
                        Payments
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {displayedNotifications.map(notification => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`mb-4 p-4 border rounded-lg ${getNotificationStyle(notification)} 
                            ${!notification.read ? 'border-l-4' : ''} relative`}
                    >
                        <div className="flex items-start gap-3">
                            {getIcon(notification)}
                            <div className="flex-1">
                                <h3 className="font-semibold">{notification.title}</h3>
                                <p className="text-gray-600">{notification.message}</p>
                                <span className="text-sm text-gray-500">
                                    {new Date(notification.date).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                {!notification.read && (
                                    <button
                                        onClick={() => handleMarkAsRead(notification.id)}
                                        className="text-blue-500 hover:text-blue-600"
                                    >
                                        Mark as read
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(notification.id)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {notifications.length > 3 && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="mt-4 text-blue-500 hover:text-blue-600 font-medium"
                >
                    {showAll ? 'Show Less' : `Show All (${notifications.length})`}
                </button>
            )}

            {notifications.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                    No notifications at this time
                </div>
            )}
        </motion.div>
    );
};

export default Notifications;
