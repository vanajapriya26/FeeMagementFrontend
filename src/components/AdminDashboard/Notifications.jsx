import React, { useState } from 'react';
import {
    FaBell,
    FaExclamationCircle,
    FaInfoCircle,
    FaCheckCircle,
    FaTimes,
    FaCalendarAlt,
    FaPlus
} from 'react-icons/fa';

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'error',
            title: 'Overdue Payment',
            message: 'Payment for student John Doe (REG001) is overdue by 15 days.',
            date: '2024-02-15',
            read: false
        },
        {
            id: 2,
            type: 'warning',
            title: 'Important Announcement',
            message: 'The school will be closed on Friday for maintenance.',
            date: '2024-02-20',
            read: false
        },
        {
            id: 3,
            type: 'success',
            title: 'Payment Received',
            message: 'Payment of ₹5000 received from student Jane Smith (REG002).',
            date: '2024-02-18',
            read: true
        }
    ]);

    // State for new notification form
    const [showNotificationForm, setShowNotificationForm] = useState(false);
    const [newNotification, setNewNotification] = useState({
        type: 'info',
        title: '',
        message: '',
        targetStudent: '' // Optional: for student-specific notifications
    });

    const notificationStyles = {
        error: {
            wrapper: 'border-red-300 bg-red-50',
            icon: <FaExclamationCircle className="text-red-500 text-xl" />,
            title: 'text-red-700'
        },
        warning: {
            wrapper: 'border-yellow-300 bg-yellow-50',
            icon: <FaInfoCircle className="text-yellow-500 text-xl" />,
            title: 'text-yellow-700'
        },
        success: {
            wrapper: 'border-green-300 bg-green-50',
            icon: <FaCheckCircle className="text-green-500 text-xl" />,
            title: 'text-green-700'
        },
        info: {
            wrapper: 'border-blue-300 bg-blue-50',
            icon: <FaInfoCircle className="text-blue-500 text-xl" />,
            title: 'text-blue-700'
        }
    };

    const addNotificationToBackend = async (notification) => {
        try {
            const response = await fetch('http://localhost:5000/admin/addnotification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: notification.title,
                    message: notification.message,
                    recipientType: notification.targetStudent || 'all'
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add notification');
            }

            const data = await response.json();
            return data.notification;
        } catch (error) {
            console.error('Error adding notification:', error);
            throw error;
        }
    };

    const handleCreateNotification = async () => {
        if (!newNotification.title.trim() || !newNotification.message.trim()) {
            alert('Please fill in both title and message fields');
            return;
        }

        try {
            const notification = {
                id: notifications.length + 1,
                type: newNotification.type,
                title: newNotification.title,
                message: newNotification.message,
                date: new Date().toISOString().split('T')[0],
                read: false,
                targetStudent: newNotification.targetStudent || null
            };

            const addedNotification = await addNotificationToBackend(notification);

            setNotifications([addedNotification, ...notifications]);
            setNewNotification({
                type: 'info',
                title: '',
                message: '',
                targetStudent: ''
            });
            setShowNotificationForm(false);
        } catch (error) {
            alert('Failed to add notification. Please try again.');
        }
    };

    const handleMarkAsRead = (id) => {
        setNotifications(notifications.map(notification =>
            notification.id === id ? { ...notification, read: true } : notification
        ));
    };

    const handleDeleteNotification = (id) => {
        if (window.confirm('Are you sure you want to delete this notification?')) {
            setNotifications(notifications.filter(notification => notification.id !== id));
        }
    };

    const unreadCount = notifications.filter(notification => !notification.read).length;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <FaBell className="text-blue-600 text-2xl" />
                    <h2 className="text-xl font-semibold">Notifications</h2>
                </div>
                <button
                    onClick={() => setShowNotificationForm(!showNotificationForm)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                    <FaPlus />
                    Create Notification
                </button>
            </div>

            {/* Notification Creation Form */}
            {showNotificationForm && (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                    <h3 className="text-lg font-semibold mb-4">Create New Notification</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Notification Type</label>
                            <select
                                className="border rounded-lg p-2 w-full"
                                value={newNotification.type}
                                onChange={(e) => setNewNotification({
                                    ...newNotification,
                                    type: e.target.value
                                })}
                            >
                                <option value="info">Information</option>
                                <option value="success">Success</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                className="border rounded-lg p-2 w-full"
                                placeholder="Notification Title"
                                value={newNotification.title}
                                onChange={(e) => setNewNotification({
                                    ...newNotification,
                                    title: e.target.value
                                })}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Message</label>
                            <textarea
                                className="border rounded-lg p-2 w-full"
                                placeholder="Notification Message"
                                rows="3"
                                value={newNotification.message}
                                onChange={(e) => setNewNotification({
                                    ...newNotification,
                                    message: e.target.value
                                })}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Target Student (Optional)</label>
                            <input
                                type="text"
                                className="border rounded-lg p-2 w-full"
                                placeholder="Enter Student ID or leave blank for all students"
                                value={newNotification.targetStudent}
                                onChange={(e) => setNewNotification({
                                    ...newNotification,
                                    targetStudent: e.target.value
                                })}
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleCreateNotification}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                                Send Notification
                            </button>
                            <button
                                onClick={() => setShowNotificationForm(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4">
                {notifications.length > 0 ? (
                    <ul className="space-y-4">
                        {notifications.map(notification => (
                            <li
                                key={notification.id}
                                className={`p-4 border rounded-lg relative ${notificationStyles[notification.type].wrapper}
                                    ${notification.read ? 'opacity-75' : ''}`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0">
                                        {notificationStyles[notification.type].icon}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center justify-between">
                                            <h3 className={`font-semibold ${notificationStyles[notification.type].title}`}>
                                                {notification.title}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center text-gray-500 text-sm">
                                                    <FaCalendarAlt className="mr-1" />
                                                    {notification.date}
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteNotification(notification.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mt-1">{notification.message}</p>
                                        {!notification.read && (
                                            <button
                                                onClick={() => handleMarkAsRead(notification.id)}
                                                className="text-blue-500 hover:text-blue-600 text-sm mt-2"
                                            >
                                                Mark as read
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <FaBell className="mx-auto text-4xl mb-2 text-gray-400" />
                        <p>No notifications to display</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;