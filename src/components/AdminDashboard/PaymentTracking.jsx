// src/components/AdminDashboard/PaymentTracking.js

import React, { useState, useEffect } from 'react';
import { FaMoneyCheck, FaSearch, FaFilter, FaCheckCircle, FaClock, FaExclamationCircle, FaGraduationCap } from 'react-icons/fa';
import { useFee } from '../../context/FeeContext';

const PaymentTracking = () => {
    const { upcomingPayments, setUpcomingPayments } = useFee();
    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Status color mapping
    const statusColors = {
        paid: 'text-green-600',
        pending: 'text-yellow-600',
        overdue: 'text-red-600'
    };

    // Status icon mapping
    const statusIcons = {
        paid: <FaCheckCircle className="text-green-600" />,
        pending: <FaClock className="text-yellow-600" />,
        overdue: <FaExclamationCircle className="text-red-600" />
    };

    // Calculate total amount
    const totalAmount = upcomingPayments.reduce((sum, payment) => sum + parseFloat(payment.amount || 0), 0);

    // Filter payments based on date, status, and search term
    const filteredPayments = upcomingPayments.filter(payment => {
        const matchesDate = filterDate ? payment.dueDate === filterDate : true;
        const matchesStatus = filterStatus ? payment.status === filterStatus : true;
        const searchLower = searchTerm.toLowerCase();

        const matchesSearch = 
            payment.studentRegNo?.toLowerCase().includes(searchLower) ||
            payment.studentName?.toLowerCase().includes(searchLower) ||
            payment.studentYear?.toLowerCase().includes(searchLower) ||
            payment.studentSemester?.toLowerCase().includes(searchLower) ||
            payment.studentDepartment?.toLowerCase().includes(searchLower) ||
            payment.category?.toLowerCase().includes(searchLower);

        return matchesDate && matchesStatus && matchesSearch;
    });

    const handleStatusChange = (paymentId, newStatus) => {
        setUpcomingPayments(prevPayments =>
            prevPayments.map(payment =>
                payment.id === paymentId 
                    ? { ...payment, status: newStatus, updatedAt: new Date().toISOString() } 
                    : payment
            )
        );
        // Show success message
        alert('Payment status updated successfully!');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <FaMoneyCheck className="text-blue-600 text-2xl" />
                    <h2 className="text-xl font-semibold">Payment Tracking</h2>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-gray-600">
                        Total Payments: {upcomingPayments.length}
                    </div>
                    <div className="text-green-600 font-semibold">
                        Total Amount: ₹{totalAmount.toFixed(2)}
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Search Input */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by reg no, name, year, semester, or department"
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
                            <th className="border border-gray-300 px-4 py-2">Register No.</th>
                            <th className="border border-gray-300 px-4 py-2">Student Name</th>
                            <th className="border border-gray-300 px-4 py-2">Year & Semester</th>
                            <th className="border border-gray-300 px-4 py-2">Department</th>
                            <th className="border border-gray-300 px-4 py-2">Category</th>
                            <th className="border border-gray-300 px-4 py-2">Amount (₹)</th>
                            <th className="border border-gray-300 px-4 py-2">Due Date</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map(payment => (
                            <tr key={payment.id} className="border-b hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 font-medium">{payment.studentRegNo}</td>
                                <td className="border border-gray-300 px-4 py-2">{payment.studentName}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <FaGraduationCap className="text-blue-500" />
                                        <span>{payment.studentYear} - {payment.studentSemester}</span>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{payment.studentDepartment}</td>
                                <td className="border border-gray-300 px-4 py-2">{payment.category}</td>
                                <td className="border border-gray-300 px-4 py-2 font-medium">₹{payment.amount}</td>
                                <td className="border border-gray-300 px-4 py-2">{payment.dueDate}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex items-center gap-2 justify-center">
                                        {statusIcons[payment.status] || statusIcons.pending}
                                        <span className={statusColors[payment.status] || statusColors.pending}>
                                            {(payment.status || 'pending').charAt(0).toUpperCase() + (payment.status || 'pending').slice(1)}
                                        </span>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <select
                                        className="border rounded-lg p-1 w-full"
                                        value={payment.status || 'pending'}
                                        onChange={(e) => handleStatusChange(payment.id, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="overdue">Overdue</option>
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