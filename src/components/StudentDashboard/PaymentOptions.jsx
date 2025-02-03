// src/components/StudentDashboard/PaymentOptions.jsx

import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { 
    FaCalendarAlt, 
    FaMoneyBillWave, 
    FaBus, 
    FaHome, 
    FaGraduationCap,
    FaUpload,
    FaImage,
    FaPaperPlane,
    FaRegClock,
    FaBook,
    FaCog,
    FaRupeeSign,
    FaArrowLeft,
    FaArrowRight,
    FaCopy
} from 'react-icons/fa';

const PaymentOptions = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // 'upi' or 'netbanking'
    const [formData, setFormData] = useState({
        year: new Date().getFullYear(),
        semester: 1,
        fees: [],
        examType: 'regular',
        numberOfSubjects: 0,
        amount: 0,
        message: '',
        image: null
    });
    const [selectedBank, setSelectedBank] = useState(null);

    const feeTypes = [
        { id: 'semester', label: 'Semester Fee', icon: <FaGraduationCap className="text-blue-500" /> },
        { id: 'exam', label: 'Exam Fee', icon: <FaBook className="text-green-500" /> },
        { id: 'transport', label: 'Transport Fee', icon: <FaBus className="text-yellow-500" /> },
        { id: 'hostel', label: 'Hostel Fee', icon: <FaHome className="text-red-500" /> },
        { id: 'training', label: 'Training Fee', icon: <FaRegClock className="text-purple-500" /> },
        { id: 'management', label: 'Management', icon: <FaCog className="text-gray-500" /> }
    ];

    const bankOptions = [
        { 
            id: 'sbi', 
            name: 'State Bank of India', 
            icon: '🏦',
            redirectUrl: 'https://retail.onlinesbi.com/retail/login.htm'
        },
        { 
            id: 'hdfc', 
            name: 'HDFC Bank', 
            icon: '🏦',
            redirectUrl: 'https://netbanking.hdfcbank.com/'
        },
        { 
            id: 'icici', 
            name: 'ICICI Bank', 
            icon: '🏦',
            redirectUrl: 'https://infinity.icicibank.com/'
        },
        { 
            id: 'axis', 
            name: 'Axis Bank', 
            icon: '🏦',
            redirectUrl: 'https://retail.axisbank.co.in/'
        },
        { id: 'canara', name: 'Canara Bank', icon: '🏦' },
        { id: 'pnb', name: 'Punjab National Bank', icon: '🏦' },
        { id: 'bob', name: 'Bank of Baroda', icon: '🏦' },
        { id: 'union', name: 'Union Bank', icon: '🏦' }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFeeChange = (feeId) => {
        setFormData(prev => ({
            ...prev,
            fees: prev.fees.includes(feeId)
                ? prev.fees.filter(f => f !== feeId)
                : [...prev.fees, feeId]
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('File size should not exceed 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                handleInputChange('image', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const calculateTotalAmount = () => {
        let total = 0;
        if (formData.fees.includes('exam')) {
            if (formData.examType === 'regular') {
                total += 1000; // Regular exam fee
            } else {
                total += formData.numberOfSubjects * 300; // Supplementary fee per subject
            }
        }
        // Add other fee calculations here
        return total;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (formData.fees.length === 0) {
            alert('Please select at least one fee type');
            return;
        }

        if (formData.amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        // Create payment data
        const paymentData = {
            ...formData,
            totalAmount: calculateTotalAmount(),
            timestamp: new Date().toISOString()
        };

        console.log('Submitting payment:', paymentData);
        // Add API call here
    };

    const handleBankSelection = (bank) => {
        // You might want to add some state management or API call here
        // before redirecting to the bank's website
        window.open(bank.redirectUrl, '_blank');
    };

    const renderPaymentMethods = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-6">Select Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    onClick={() => {
                        setSelectedPaymentMethod('upi');
                        setShowForm(true);
                    }}
                    className="p-6 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                >
                    <div className="flex flex-col items-center gap-3">
                        <FaMoneyBillWave className="text-3xl text-green-500" />
                        <div className="text-center">
                            <h4 className="font-semibold">UPI Payment</h4>
                            <p className="text-sm text-gray-600">Pay using UPI apps</p>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => {
                        setSelectedPaymentMethod('netbanking');
                        setShowForm(true);
                    }}
                    className="p-6 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                >
                    <div className="flex flex-col items-center gap-3">
                        <FaGraduationCap className="text-3xl text-blue-500" />
                        <div className="text-center">
                            <h4 className="font-semibold">Net Banking</h4>
                            <p className="text-sm text-gray-600">Pay using Net Banking</p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );

    const renderNetBankingOptions = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Select Your Bank</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bankOptions.map(bank => (
                    <button
                        key={bank.id}
                        onClick={() => handleBankSelection(bank)}
                        className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{bank.icon}</span>
                            <span className="font-medium">{bank.name}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-4">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-green-500 text-2xl" />
                    <h2 className="text-xl font-semibold">Payment Options</h2>
                </div>
                {selectedPaymentMethod && (
                    <button
                        onClick={() => {
                            setSelectedPaymentMethod(null);
                            setSelectedBank(null);
                        }}
                        className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
                    >
                        <FaArrowLeft /> Back
                    </button>
                )}
            </div>

            {!selectedPaymentMethod ? (
                renderPaymentMethods()
            ) : selectedPaymentMethod === 'netbanking' ? (
                renderNetBankingOptions()
            ) : (
                <div>
                    <h3 className="text-lg font-semibold mb-4">UPI Payment</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* QR Code */}
                        <div className="flex flex-col items-center mb-6">
                            <div className="p-4 bg-white rounded-lg shadow-md">
                                <QRCodeCanvas 
                                    value={`https://payment-link.com?year=${formData.year}&semester=${formData.semester}`} 
                                    size={200}
                                    level="H"
                                    includeMargin={true}
                                />
                            </div>
                            <div className="mt-4 text-center">
                                <p className="text-gray-600 mb-1">UPI ID:</p>
                                <div className="flex items-center justify-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border">
                                    <span className="font-medium text-gray-800">7840054568@upi</span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            navigator.clipboard.writeText('7840054568@upi');
                                            alert('UPI ID copied to clipboard!');
                                        }}
                                        className="text-blue-500 hover:text-blue-600"
                                    >
                                        <FaCopy />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    Scan QR code or use UPI ID to make payment
                                </p>
                            </div>
                        </div>

                        {/* Year Selection */}
                        <div className="relative">
                            <label className="block text-gray-700 font-semibold mb-2">
                                <FaCalendarAlt className="inline mr-2 text-blue-500" />
                                Regulation Year
                            </label>
                            <select
                                value={formData.year}
                                onChange={(e) => handleInputChange('year', e.target.value)}
                                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                            >
                                {[...Array(14)].map((_, index) => (
                                    <option key={index} value={new Date().getFullYear() - index}>
                                        {new Date().getFullYear() - index}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Fee Types */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                <FaMoneyBillWave className="inline mr-2 text-green-500" />
                                Select Fees
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                {feeTypes.map(fee => (
                                    <label key={fee.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            checked={formData.fees.includes(fee.id)}
                                            onChange={() => handleFeeChange(fee.id)}
                                            className="mr-3"
                                        />
                                        {fee.icon}
                                        <span className="ml-2">{fee.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Exam Type Options */}
                        {formData.fees.includes('exam') && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        <FaBook className="inline mr-2 text-green-500" />
                                        Exam Type
                                    </label>
                                    <div className="flex gap-4">
                                        {['regular', 'supple'].map(type => (
                                            <label key={type} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    value={type}
                                                    checked={formData.examType === type}
                                                    onChange={(e) => handleInputChange('examType', e.target.value)}
                                                    className="mr-2"
                                                />
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {formData.examType === 'supple' && (
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">
                                            Number of Subjects (₹300 per subject)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={formData.numberOfSubjects}
                                            onChange={(e) => handleInputChange('numberOfSubjects', parseInt(e.target.value))}
                                            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Amount Input */}
                        <div className="relative">
                            <label className="block text-gray-700 font-semibold mb-2">
                                <FaRupeeSign className="inline mr-2 text-green-500" />
                                Amount
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={formData.amount}
                                    onChange={(e) => handleInputChange('amount', parseFloat(e.target.value))}
                                    className="border rounded-lg p-2 w-full pl-8 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter amount"
                                />
                                <FaRupeeSign className="absolute left-3 top-3 text-gray-400" />
                            </div>
                        </div>

                        {/* Message Input */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                <FaPaperPlane className="inline mr-2 text-blue-500" />
                                Message
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => handleInputChange('message', e.target.value)}
                                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                                rows="3"
                                placeholder="Add any additional information"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                <FaImage className="inline mr-2 text-purple-500" />
                                Upload Payment Screenshot
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <FaUpload className="text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-500">Click to upload screenshot</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Image Preview */}
                        {formData.image && (
                            <div className="mt-4">
                                <p className="text-sm font-semibold mb-2">Preview:</p>
                                <img
                                    src={formData.image}
                                    alt="Payment Screenshot"
                                    className="max-w-full h-auto rounded-lg"
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center gap-2"
                        >
                            <FaPaperPlane />
                            Submit Payment
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PaymentOptions;

