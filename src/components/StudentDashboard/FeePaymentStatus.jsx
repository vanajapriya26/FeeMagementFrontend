// src/components/StudentDashboard/FeePaymentStatus.jsx

import React, { useState } from 'react';
import { 
    FaMoneyBill, 
    FaFileInvoice, 
    FaDownload, 
    FaCheckCircle, 
    FaClock, 
    FaExclamationCircle,
    FaCalendarAlt,
    FaSearch
} from 'react-icons/fa';

const FeePaymentStatus = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Dummy data for fee payment history
    const feePayments = [
        { 
            id: 1, 
            status: 'paid', 
            amount: 5000, 
            dueDate: '2024-01-15', 
            paidDate: '2024-01-10',
            category: 'Tuition Fee',
            invoice: 'Invoice_001.pdf' 
        },
        { 
            id: 2, 
            status: 'pending', 
            amount: 3000, 
            dueDate: '2024-02-15',
            paidDate: null,
            category: 'Library Fee',
            invoice: 'Invoice_002.pdf' 
        },
        { 
            id: 3, 
            status: 'overdue', 
            amount: 4500, 
            dueDate: '2024-01-30',
            paidDate: null,
            category: 'Sports Fee',
            invoice: 'Invoice_003.pdf' 
        },
    ];

    // Status styles mapping
    const statusStyles = {
        paid: {
            icon: <FaCheckCircle className="text-green-500" />,
            text: 'text-green-500',
            bg: 'bg-green-100'
        },
        pending: {
            icon: <FaClock className="text-yellow-500" />,
            text: 'text-yellow-500',
            bg: 'bg-yellow-100'
        },
        overdue: {
            icon: <FaExclamationCircle className="text-red-500" />,
            text: 'text-red-500',
            bg: 'bg-red-100'
        }
    };

    // Filter and search payments
    const filteredPayments = feePayments.filter(payment => {
        const matchesSearch = 
            payment.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.id.toString().includes(searchTerm);
        const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleDownloadInvoice = (invoice) => {
        // Simulated download functionality
        console.log(`Downloading invoice: ${invoice}`);
        alert(`Downloading ${invoice}`);
    };

    // Calculate total and pending amounts
    const totalAmount = feePayments.reduce((sum, payment) => sum + payment.amount, 0);
    const pendingAmount = feePayments
        .filter(payment => payment.status !== 'paid')
        .reduce((sum, payment) => sum + payment.amount, 0);

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-6">
                <FaMoneyBill className="text-blue-600 text-2xl" />
                <h2 className="text-2xl font-semibold">Fee Payment Status</h2>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600">Total Fees</p>
                            <p className="text-2xl font-bold">₹{totalAmount}</p>
                        </div>
                        <FaMoneyBill className="text-blue-500 text-3xl" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600">Pending Amount</p>
                            <p className="text-2xl font-bold">₹{pendingAmount}</p>
                        </div>
                        <FaClock className="text-yellow-500 text-3xl" />
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by category or payment ID"
                            className="pl-10 p-2 border border-gray-300 rounded-lg w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    <select
                        className="p-2 border border-gray-300 rounded-lg"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="overdue">Overdue</option>
                    </select>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">Payment ID</th>
                                <th className="px-4 py-2 text-left">Category</th>
                                <th className="px-4 py-2 text-left">Amount</th>
                                <th className="px-4 py-2 text-left">Due Date</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredPayments.map((payment) => (
                                <tr key={payment.id}>
                                    <td className="px-4 py-2">#{payment.id}</td>
                                    <td className="px-4 py-2">{payment.category}</td>
                                    <td className="px-4 py-2">₹{payment.amount}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-gray-400" />
                                            {payment.dueDate}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusStyles[payment.status].bg} ${statusStyles[payment.status].text}`}>
                                            {statusStyles[payment.status].icon}
                                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleDownloadInvoice(payment.invoice)}
                                            className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
                                        >
                                            <FaFileInvoice />
                                            <FaDownload />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredPayments.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                        No payments found matching your filters.
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeePaymentStatus;