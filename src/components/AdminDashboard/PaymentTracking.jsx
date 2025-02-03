// src/components/AdminDashboard/PaymentTracking.js

import React, { useState } from 'react';
import { FaMoneyCheck, FaSearch, FaFilter, FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';

const PaymentTracking = () => {
    const [payments, setPayments] = useState([
        { id: 1, studentName: 'John Doe', amount: 5000, status: 'paid', date: '2024-02-15', category: 'Tuition Fee' },
        { id: 2, studentName: 'Jane Smith', amount: 2000, status: 'pending', date: '2024-02-20', category: 'Library Fee' },
        { id: 3, studentName: 'Mike Johnson', amount: 1500, status: 'overdue', date: '2024-01-30', category: 'Sports Fee' },
    ]);

    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Status color mapping
    const statusColors = {
        paid: 'text-green-500',
        pending: 'text-yellow-500',
        overdue: 'text-red-500'
    };

    // Status icon mapping
    const statusIcons = {
        paid: <FaCheckCircle className={statusColors.paid} />,
        pending: <FaClock className={statusColors.pending} />,
        overdue: <FaExclamationCircle className={statusColors.overdue} />
    };

    // Filter payments based on date, status, and search term
    const filteredPayments = payments.filter(payment => {
        const matchesDate = filterDate ? payment.date === filterDate : true;
        const matchesStatus = filterStatus ? payment.status === filterStatus : true;
        const matchesSearch = payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            payment.category.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesDate && matchesStatus && matchesSearch;
    });

    const handleStatusChange = (paymentId, newStatus) => {
        setPayments(payments.map(payment =>
            payment.id === paymentId ? { ...payment, status: newStatus } : payment
        ));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-6">
                <FaMoneyCheck className="text-blue-600 text-2xl" />
                <h2 className="text-xl font-semibold">Payment Tracking</h2>
            </div>

            {/* Search and Filter Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Search Input */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by student or category"
                        className="border rounded-lg pl-10 p-2 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>

                {/* Date Filter */}
                <div>
                    <div className="flex items-center gap-2">
                        <FaFilter className="text-gray-400" />
                        <label className="text-gray-700">Filter by Date:</label>
                    </div>
                    <input
                        type="date"
                        className="border rounded-lg p-2 w-full mt-1"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                </div>

                {/* Status Filter */}
                <div>
                    <div className="flex items-center gap-2">
                        <FaFilter className="text-gray-400" />
                        <label className="text-gray-700">Filter by Status:</label>
                    </div>
                    <select
                        className="border rounded-lg p-2 w-full mt-1"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="overdue">Overdue</option>
                    </select>
                </div>
            </div>

            {/* Payments Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Student Name</th>
                            <th className="border border-gray-300 px-4 py-2">Category</th>
                            <th className="border border-gray-300 px-4 py-2">Amount (₹)</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map(payment => (
                            <tr key={payment.id} className="border-b">
                                <td className="border border-gray-300 px-4 py-2">{payment.studentName}</td>
                                <td className="border border-gray-300 px-4 py-2">{payment.category}</td>
                                <td className="border border-gray-300 px-4 py-2">₹{payment.amount}</td>
                                <td className="border border-gray-300 px-4 py-2">{payment.date}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex items-center gap-2 justify-center">
                                        {statusIcons[payment.status]}
                                        <span className={statusColors[payment.status]}>
                                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                        </span>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <select
                                        className="border rounded-lg p-1"
                                        value={payment.status}
                                        onChange={(e) => handleStatusChange(payment.id, e.target.value)}
                                    >
                                        <option value="paid">Mark as Paid</option>
                                        <option value="pending">Mark as Pending</option>
                                        <option value="overdue">Mark as Overdue</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredPayments.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                    No payments found matching the current filters.
                </div>
            )}
        </div>
    );
};

export default PaymentTracking;