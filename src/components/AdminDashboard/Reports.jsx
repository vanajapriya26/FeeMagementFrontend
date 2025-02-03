// src/components/AdminDashboard/Reports.js

import React, { useState } from 'react';
import { 
    FaFileAlt, 
    FaDownload, 
    FaChartBar, 
    FaMoneyBillWave, 
    FaUserGraduate, 
    FaExclamationCircle,
    FaCalendarAlt,
    FaTrash
} from 'react-icons/fa';

const Reports = () => {
    const [reports, setReports] = useState([
        { 
            id: 1, 
            name: 'Payment Report - January 2024',
            type: 'payment',
            date: '2024-01-31',
            status: 'generated'
        },
        { 
            id: 2, 
            name: 'Student Performance Report - Q1 2024',
            type: 'performance',
            date: '2024-03-31',
            status: 'generated'
        },
        { 
            id: 3, 
            name: 'Outstanding Fees Report - March 2024',
            type: 'outstanding',
            date: '2024-03-15',
            status: 'generated'
        }
    ]);

    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedReportType, setSelectedReportType] = useState('payment');
    const [studentIdentifier, setStudentIdentifier] = useState('');
    const [showStudentInput, setShowStudentInput] = useState(false);

    const reportTypes = {
        payment: {
            icon: <FaMoneyBillWave className="text-green-500" />,
            color: 'bg-green-600 hover:bg-green-700'
        },
        performance: {
            icon: <FaUserGraduate className="text-blue-500" />,
            color: 'bg-blue-600 hover:bg-blue-700'
        },
        outstanding: {
            icon: <FaExclamationCircle className="text-yellow-500" />,
            color: 'bg-yellow-600 hover:bg-yellow-700'
        },
        student: {
            icon: <FaUserGraduate className="text-purple-500" />,
            color: 'bg-purple-600 hover:bg-purple-700'
        }
    };

    const handleReportTypeChange = (e) => {
        const type = e.target.value;
        setSelectedReportType(type);
        setShowStudentInput(type === 'student');
        if (type !== 'student') {
            setStudentIdentifier('');
        }
    };

    const handleGenerateReport = () => {
        if (selectedReportType === 'student' && !studentIdentifier.trim()) {
            alert('Please enter student Register ID or Name');
            return;
        }

        if (!selectedMonth) {
            alert('Please select a month');
            return;
        }

        const reportName = selectedReportType === 'student'
            ? `Student Report - ${studentIdentifier} - ${selectedMonth} ${selectedYear}`
            : `${selectedReportType.charAt(0).toUpperCase() + selectedReportType.slice(1)} Report - ${selectedMonth} ${selectedYear}`;

        const newReport = {
            id: reports.length + 1,
            name: reportName,
            type: selectedReportType,
            date: new Date().toISOString().split('T')[0],
            status: 'generated',
            studentId: selectedReportType === 'student' ? studentIdentifier : null
        };

        setReports([newReport, ...reports]);
        
        if (selectedReportType === 'student') {
            setStudentIdentifier('');
        }
    };

    const handleDeleteReport = (reportId) => {
        if (window.confirm('Are you sure you want to delete this report?')) {
            setReports(reports.filter(report => report.id !== reportId));
        }
    };

    const handleDownloadReport = (report) => {
        // Simulated download functionality
        console.log(`Downloading report: ${report.name}`);
        alert(`Downloading ${report.name}`);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center gap-2 mb-6">
                <FaFileAlt className="text-blue-600 text-2xl" />
                <h2 className="text-xl font-semibold">Reports</h2>
            </div>

            {/* Report Generation Form */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                    <label className="block text-gray-700 mb-2">Report Type</label>
                    <select
                        className="border rounded-lg p-2 w-full"
                        value={selectedReportType}
                        onChange={handleReportTypeChange}
                    >
                        <option value="payment">Payment Report</option>
                        <option value="performance">Student Performance Report</option>
                        <option value="outstanding">Outstanding Fees Report</option>
                        <option value="student">Individual Student Report</option>
                    </select>
                </div>

                {showStudentInput && (
                    <div>
                        <label className="block text-gray-700 mb-2">Student Register ID/Name</label>
                        <input
                            type="text"
                            placeholder="Enter Register ID or Name"
                            className="border rounded-lg p-2 w-full"
                            value={studentIdentifier}
                            onChange={(e) => setStudentIdentifier(e.target.value)}
                        />
                    </div>
                )}

                <div className={showStudentInput ? 'md:col-span-1' : ''}>
                    <label className="block text-gray-700 mb-2">Month</label>
                    <select
                        className="border rounded-lg p-2 w-full"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="">Select Month</option>
                        {['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'
                        ].map(month => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>
                </div>

                <div className={showStudentInput ? 'md:col-span-1' : ''}>
                    <label className="block text-gray-700 mb-2">Year</label>
                    <select
                        className="border rounded-lg p-2 w-full"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        {[...Array(5)].map((_, i) => {
                            const year = new Date().getFullYear() - i;
                            return <option key={year} value={year}>{year}</option>;
                        })}
                    </select>
                </div>

                <div className="flex items-end md:col-span-1">
                    <button
                        className={`py-2 px-4 text-white rounded-lg flex items-center gap-2 w-full justify-center ${reportTypes[selectedReportType].color}`}
                        onClick={handleGenerateReport}
                    >
                        <FaChartBar />
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Generated Reports Table */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Generated Reports</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Report Name</th>
                                <th className="border border-gray-300 px-4 py-2">Type</th>
                                <th className="border border-gray-300 px-4 py-2">Date Generated</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map(report => (
                                <tr key={report.id} className="border-b">
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            {reportTypes[report.type].icon}
                                            {report.name}
                                        </div>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-gray-400" />
                                            {report.date}
                                        </div>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="flex justify-center gap-4">
                                            <button
                                                className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
                                                onClick={() => handleDownloadReport(report)}
                                            >
                                                <FaDownload />
                                                Download
                                            </button>
                                            <button
                                                className="text-red-500 hover:text-red-600 flex items-center gap-1"
                                                onClick={() => handleDeleteReport(report.id)}
                                            >
                                                <FaTrash />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {reports.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                        No reports generated yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;