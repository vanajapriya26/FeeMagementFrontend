// src/components/AdminDashboard/OverviewStatistics.jsx

import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { FaUserGraduate, FaMoneyBillWave, FaExclamationTriangle } from 'react-icons/fa';

// Register all necessary components
Chart.register(...registerables);

const OverviewStatistics = () => {
    // Demo data
    const totalStudents = 500; // Example number of students
    const totalFeesCollected = 12000; // Example total fees collected
    const outstandingPayments = 3000; // Example outstanding payments

    // Chart data for Doughnut
    const doughnutData = {
        labels: ['Total Students', 'Total Fees Collected', 'Outstanding Payments'],
        datasets: [
            {
                label: 'Statistics',
                data: [totalStudents, totalFeesCollected, outstandingPayments],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Chart options for Doughnut
    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value}`;
                    },
                },
            },
        },
    };

    // Chart data for Bar
    const barData = {
        labels: ['Total Students', 'Total Fees Collected', 'Outstanding Payments'],
        datasets: [
            {
                label: 'Statistics',
                data: [totalStudents, totalFeesCollected, outstandingPayments],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Chart options for Bar
    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold">Overview Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* Card for Total Students */}
                <div className="bg-blue-100 p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">Total Students</h3>
                            <p className="text-2xl font-bold">{totalStudents}</p>
                        </div>
                        <FaUserGraduate className="text-blue-500 text-3xl" />
                    </div>
                </div>

                {/* Card for Total Fees Collected */}
                <div className="bg-green-100 p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">Total Fees Collected</h3>
                            <p className="text-2xl font-bold">₹{totalFeesCollected}</p>
                        </div>
                        <FaMoneyBillWave className="text-green-500 text-3xl" />
                    </div>
                </div>

                {/* Card for Outstanding Payments */}
                <div className="bg-red-100 p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">Outstanding Payments</h3>
                            <p className="text-2xl font-bold">₹{outstandingPayments}</p>
                        </div>
                        <FaExclamationTriangle className="text-red-500 text-3xl" />
                    </div>
                </div>
            </div>

            {/* Cards for Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* Doughnut Chart Card */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">Statistics Overview (Doughnut Chart)</h3>
                    <div className="h-64">
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                </div>

                {/* Bar Chart Card */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">Statistics Overview (Bar Chart)</h3>
                    <div className="h-64">
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewStatistics;