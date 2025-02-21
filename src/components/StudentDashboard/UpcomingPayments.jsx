import React, { useState, useEffect } from "react";
import {
    FaCalendarAlt,
    FaBell,
    FaMoneyBillWave,
    FaExclamationTriangle,
    FaClock,
    FaArrowRight,
    FaTimes,
    FaSearch,
    FaUser
} from "react-icons/fa";
import { useFee } from '../../context/FeeContext';

const UpcomingPayments = () => {
    const { feeCategories, upcomingPayments, setUpcomingPayments, getStudentPayments } = useFee();
    const [sortBy, setSortBy] = useState("dueDate");
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedPayment, setSelectedPayment] = useState(null);
    // Mock current student ID - in a real app, this would come from authentication
    const currentStudentId = 1;

    // Logic to filter and display upcoming payments based on fee categories
    const studentPayments = getStudentPayments(currentStudentId);

    useEffect(() => {
        console.log('Student payments updated:', studentPayments);
    }, [studentPayments]);

    // Log whenever upcomingPayments changes
    useEffect(() => {
        console.log('All upcoming payments changed:', upcomingPayments);
    }, [upcomingPayments]);

    // Combine upcomingPaymentsList with studentPayments
    const upcomingPaymentsList = feeCategories.map(category => ({
        id: category.id,
        category: category.name,
        description: category.description || "", // Add description if available
        amount: category.amount,
        dueDate: category.dueDate // Assuming dueDate is part of the category
    }));

    const combinedPayments = [...studentPayments, ...upcomingPaymentsList];

    // Sorting and filtering logic
    const sortedPayments = combinedPayments
        .filter(payment =>
            payment.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.amount?.toString().includes(searchQuery)
        )
        .filter(payment => filterStatus === "all" || payment.status === filterStatus)
        .sort((a, b) => (sortBy === "dueDate" ? new Date(a.dueDate) - new Date(b.dueDate) : b.amount - a.amount));

    // Total amount calculation with safety checks
    const totalUpcoming = combinedPayments
        .filter(payment => payment && payment.status === 'upcoming' && !isNaN(payment.amount))
        .reduce((sum, payment) => sum + (parseFloat(payment.amount) || 0), 0);

    console.log('Sorted and filtered payments:', sortedPayments);
    console.log('Total upcoming amount:', totalUpcoming);

    // Determine if payment is urgent (due in ≤ 7 days)
    const isUrgent = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
        return diffDays <= 7 && diffDays >= 0;
    };

    // Handle payment modal open
    const openPaymentModal = (payment) => {
        setSelectedPayment(payment);
    };

    // Handle payment process (simulate with a timeout)
    const handlePayment = () => {
        setUpcomingPayments((prev) =>
            prev.map((payment) =>
                payment.id === selectedPayment.id ? { ...payment, status: "paid" } : payment
            )
        );
        setSelectedPayment(null);
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

            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="relative w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Search by category, description, or amount..."
                        className="border rounded-lg p-2 w-full pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-500" />
                </div>
                <div className="flex gap-4">
                    <select
                        className="border rounded-lg p-2"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Payments</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="urgent">Urgent</option>
                    </select>
                    <select
                        className="border rounded-lg p-2"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="dueDate">Sort by Due Date</option>
                        <option value="amount">Sort by Amount</option>
                    </select>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
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
                                <tr key={payment.id} className={isUrgent(payment.dueDate) ? "bg-red-50" : ""}>
                                    <td className="px-4 py-2 flex items-center gap-2">
                                        <FaMoneyBillWave className="text-green-500" />
                                        {payment.category}
                                    </td>
                                    <td className="px-4 py-2">{payment.description}</td>
                                    <td className="px-4 py-2 font-semibold">₹{payment.amount}</td>
                                    <td className="px-4 py-2 flex items-center gap-2">
                                        <FaCalendarAlt className="text-gray-400" />
                                        {payment.dueDate}
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
                                        <button
                                            className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
                                            onClick={() => openPaymentModal(payment)}
                                        >
                                            Pay Now
                                            <FaArrowRight />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Payment Modal */}
            {selectedPayment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold">Confirm Payment</h3>
                        <p>Pay ₹{selectedPayment.amount} for {selectedPayment.category}?</p>
                        <div className="flex justify-end gap-4 mt-4">
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => setSelectedPayment(null)}>
                                <FaTimes /> Cancel
                            </button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handlePayment}>
                                Pay Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpcomingPayments;
