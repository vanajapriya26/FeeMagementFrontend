import React, { useState, useMemo } from 'react';
import { 
    FaMoneyBill, 
    FaFileInvoice, 
    FaDownload, 
    FaCheckCircle, 
    FaClock, 
    FaExclamationCircle,
    FaCalendarAlt,
    FaSearch,
    FaSortAmountDown,
    FaSortAmountUp,
    FaCloudDownloadAlt
} from 'react-icons/fa';
import { fetchUpcomingPayments } from '../../utils/paymentUtils';

const handleUpcomingPaymentsClick = async () => {
    try {
        // Fetch upcoming payments or perform an action
        const response = await fetchUpcomingPayments(); // Ensure this function is efficient
        // Update state or perform necessary actions with the response
    } catch (error) {
        console.error('Error fetching upcoming payments:', error);
        alert('There was an error fetching upcoming payments. Please try again later.');
    }
};

const FeePaymentStatus = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    // Dummy data for fee payment history
    const feePayments = [
        { id: 1, status: 'paid', amount: 5000, dueDate: '2024-01-15', paidDate: '2024-01-10', category: 'Tuition Fee', invoice: 'Invoice_001.pdf' },
        { id: 2, status: 'pending', amount: 3000, dueDate: '2024-02-15', paidDate: null, category: 'Hostel Fee', invoice: 'Invoice_002.pdf' },
        { id: 3, status: 'overdue', amount: 1200, dueDate: '2024-01-30', paidDate: null, category: 'Exam Fee', invoice: 'Invoice_003.pdf' },
    ];

    // Status styles mapping
    const statusStyles = {
        paid: { icon: <FaCheckCircle className="text-green-500" />, text: 'text-green-500', bg: 'bg-green-100' },
        pending: { icon: <FaClock className="text-yellow-500" />, text: 'text-yellow-500', bg: 'bg-yellow-100' },
        overdue: { icon: <FaExclamationCircle className="text-red-500" />, text: 'text-red-500', bg: 'bg-red-100' }
    };

    // Filtered and sorted payments
    const filteredPayments = useMemo(() => {
        return feePayments
            .filter(payment => {
                const matchesSearch = payment.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                     payment.id.toString().includes(searchTerm);
                const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                if (!sortBy) return 0;
                const valueA = sortBy === 'amount' ? a.amount : new Date(a.dueDate);
                const valueB = sortBy === 'amount' ? b.amount : new Date(b.dueDate);
                return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
            });
    }, [searchTerm, filterStatus, sortBy, sortOrder]);

    const handleDownloadInvoice = (invoice) => {
        console.log(`Downloading invoice: ${invoice}`);
        alert(`Downloading ${invoice}`);
    };

    const handleDownloadAllInvoices = () => {
        console.log("Downloading all invoices");
        alert("Downloading all invoices...");
    };

    const handleSort = (criteria) => {
        if (sortBy === criteria) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(criteria);
            setSortOrder('asc');
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-6">
                <FaMoneyBill className="text-blue-600 text-2xl" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200">Fee Payment Status</h2>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
                    <p className="text-gray-600 dark:text-gray-300">Total Fees</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{feePayments.reduce((sum, p) => sum + p.amount, 0)}</p>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
                    <p className="text-gray-600 dark:text-gray-300">Pending Amount</p>
                    <p className="text-2xl font-bold text-yellow-500">₹{feePayments.filter(p => p.status !== 'paid').reduce((sum, p) => sum + p.amount, 0)}</p>
                </div>
                <button 
                    onClick={handleDownloadAllInvoices}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg flex items-center gap-2 shadow-md">
                    <FaCloudDownloadAlt /> Download All Invoices
                </button>
            </div>

            {/* Filters & Sorting */}
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4">
                <input 
                    type="text"
                    placeholder="Search by category or ID"
                    className="border p-2 rounded-lg w-full md:w-auto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                    className="border p-2 rounded-lg"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                </select>
                <button onClick={() => handleSort('amount')} className="flex items-center gap-2 text-gray-700 dark:text-white">
                    {sortBy === 'amount' && sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />} Sort by Amount
                </button>
                <button onClick={() => handleSort('dueDate')} className="flex items-center gap-2 text-gray-700 dark:text-white">
                    {sortBy === 'dueDate' && sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />} Sort by Due Date
                </button>
            </div>

            {/* Payments Table */}
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th>Payment ID</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map(payment => (
                            <tr key={payment.id} className="border-b">
                                <td>#{payment.id}</td>
                                <td>{payment.category}</td>
                                <td>₹{payment.amount}</td>
                                <td>{payment.dueDate}</td>
                                <td>{statusStyles[payment.status].icon} {payment.status}</td>
                                <td>
                                    <button onClick={() => handleDownloadInvoice(payment.invoice)} className="text-blue-500">Download</button>
                                    {payment.status !== 'paid' && <button className="text-green-500 ml-2">Pay Now</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeePaymentStatus;
