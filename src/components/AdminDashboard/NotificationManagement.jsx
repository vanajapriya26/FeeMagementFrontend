import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaPlus, FaTrash, FaEdit, FaTimes } from 'react-icons/fa';
import { useFee } from '../../context/FeeContext';

const NotificationManagement = () => {
    const { notifications, addNotification, deleteNotification } = useFee();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        type: 'info',
        priority: 'normal'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNotification = {
            id: Date.now().toString(),
            ...formData,
            date: new Date().toISOString(),
            read: false,
            fromAdmin: true
        };
        addNotification(newNotification);
        setFormData({
            title: '',
            message: '',
            type: 'info',
            priority: 'normal'
        });
        setShowForm(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <FaBell className="text-2xl text-blue-500" />
                    <h2 className="text-xl font-semibold">Notification Management</h2>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
                >
                    <FaPlus /> Create Notification
                </button>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.form
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-6 p-4 border rounded-lg bg-gray-50"
                        onSubmit={handleSubmit}
                    >
                        <div className="grid gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg"
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Type
                                    </label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    >
                                        <option value="info">Information</option>
                                        <option value="warning">Warning</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Priority
                                    </label>
                                    <select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    >
                                        <option value="low">Low</option>
                                        <option value="normal">Normal</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Send Notification
                                </button>
                            </div>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            <div className="space-y-4">
                {notifications.filter(n => n.fromAdmin).map(notification => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`p-4 border rounded-lg ${
                            notification.type === 'urgent' 
                                ? 'bg-red-50 border-red-200' 
                                : notification.type === 'warning'
                                    ? 'bg-yellow-50 border-yellow-200'
                                    : 'bg-blue-50 border-blue-200'
                        }`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold">{notification.title}</h3>
                                <p className="text-gray-600 mt-1">{notification.message}</p>
                                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                    <span>
                                        {new Date(notification.date).toLocaleDateString()}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        notification.priority === 'high' 
                                            ? 'bg-red-100 text-red-800'
                                            : notification.priority === 'normal'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-green-100 text-green-800'
                                    }`}>
                                        {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)} Priority
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => deleteNotification(notification.id)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </motion.div>
                ))}

                {notifications.filter(n => n.fromAdmin).length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                        No notifications have been sent yet
                    </div>
                )}
            </div>
        </div>
    );
};

// Function to send notification to backend
export const sendNotificationToBackend = async (notification) => {
    // Implement the logic to send the notification to the backend API
    // For example:
    const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
    });
    return response.json();
};

export default NotificationManagement;
