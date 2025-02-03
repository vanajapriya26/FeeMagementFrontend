// src/components/StudentDashboard/UpcomingPayments.jsx

import React, { useState } from 'react';
import { 
    FaCalendarAlt, 
    FaBell, 
    FaMoneyBillWave, 
    FaExclamationTriangle,
    FaClock,
    FaArrowRight
} from 'react-icons/fa';

const UpcomingPayments = () => {
    const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate' or 'amount'

    // Dummy data for upcoming payments
    const upcomingPayments = [
        { 
            id: 1, 
            amount: 6000, 
            dueDate: '2024-04-15',
            category: 'Tuition Fee',
            description: 'Second Semester Fee',
            status: 'upcoming'
        },
        { 
            id: 2, 
            amount: 4000, 
            dueDate: '2024-05-15',
            category: 'Library Fee',
            description: 'Annual Library Subscription',
            status: 'urgent'
        },
        { 
            id: 3, 
            amount: 3500, 
            dueDate: '2024-06-15',
            category: 'Sports Fee',
            description: 'Annual Sports Membership',
            status: 'upcoming'
        },
    ];

    // Sort payments based on selected criteria
    const sortedPayments = [...upcomingPayments].sort((a, b) => {
        if (sortBy === 'dueDate') {
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
        return b.amount - a.amount;
    });

    // Calculate total upcoming amount
    const totalUpcoming = upcomingPayments.reduce((sum, payment) => sum + payment.amount, 0);

    // Function to determine if a payment is urgent (due within 7 days)
    const isUrgent = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7 && diffDays >= 0;
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-600 text-2xl" />
                    <h2 className="text-2xl font-semibold">Upcoming Payments</h2>
                </div>
                <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-lg">
                    <FaBell className="text-yellow-500" />
                    <span className="text-yellow-700">Total Due: ₹{totalUpcoming}</span>
                </div>
            </div>

            {/* Sort Controls */}
            <div className="mb-6 flex justify-end">
                <select
                    className="border rounded-lg p-2"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="dueDate">Sort by Due Date</option>
                    <option value="amount">Sort by Amount</option>
                </select>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Add horizontal scroll for mobile */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">Category</th>
                                <th className="px-4 py-2 text-left">Description</th>
                                <th className="px-4 py-2 text-left">Amount</th>
                                <th className="px-4 py-2 text-left">Due Date</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {sortedPayments.map((payment) => (
                                <tr key={payment.id} className={isUrgent(payment.dueDate) ? 'bg-red-50' : ''}>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            <FaMoneyBillWave className="text-green-500" />
                                            {payment.category}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">{payment.description}</td>
                                    <td className="px-4 py-2 font-semibold">₹{payment.amount}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-gray-400" />
                                            {payment.dueDate}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        {isUrgent(payment.dueDate) ? (
                                            <span className="flex items-center gap-1 text-red-500">
                                                <FaExclamationTriangle />
                                                Urgent
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-yellow-500">
                                                <FaClock />
                                                Upcoming
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
                                            Pay Now
                                            <FaArrowRight />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 text-yellow-700">
                        <FaBell className="text-yellow-500" />
                        <p>
                            Reminder: Please ensure to make your payments before the due dates to avoid any late fees.
                            Payments marked as urgent are due within 7 days.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingPayments;