import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaUniversity, FaQrcode, FaCheck, FaQuestionCircle, FaDownload, FaShare } from 'react-icons/fa';
import QRCode from '../../assests/QR.png';
import '../../styles/global.css';

const PaymentOptions = () => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [showQR, setShowQR] = useState(false);
    const [formData, setFormData] = useState({
        feeType: '',
        amount: '',
        paymentMethod: 'razorpay' // Default payment method
    });

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        if (formData.paymentMethod === 'qr') {
            alert('✅ Please complete the payment by scanning the QR code. After payment, take a screenshot for your records.');
            return;
        }
        e.preventDefault();

        if (!formData.feeType) {
            alert("⚠️ Please select a fee category.");
            return;
        }
        if (!formData.amount || formData.amount <= 0) {
            alert("💰 Please enter a valid amount.");
            return;
        }

        if (typeof window.Razorpay === "undefined") {
            alert("🚨 Razorpay SDK failed to load. Check your internet connection.");
            return;
        }

        const options = {
            "key": "rzp_test_vb45nFoL6qiUnU",
            "amount": formData.amount * 100,
            "currency": "INR",
            "description": formData.feeType + " Payment",
            "prefill": {
                "email": "student@example.com",
                "contact": "9876543210",
            },
            "handler": function (response) {
                alert("✅ Payment Successful! Payment ID: " + response.razorpay_payment_id);
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    const paymentMethods = [
        {
            id: 'razorpay',
            name: 'Razorpay',
            icon: <FaCreditCard className="text-2xl text-blue-500" />,
            description: 'Pay securely using Razorpay'
        },
        {
            id: 'qr',
            name: 'QR Code',
            icon: <FaQrcode className="text-2xl text-indigo-500" />,
            description: 'Scan and pay using any payment app'
        }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="max-w-4xl mx-auto p-6 space-y-8 animate-fade-in"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-2 gradient-text">Fee Payment</h2>
                    <p className="text-secondary-color">Complete your payment securely</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-secondary-color">Need help?</span>
                    <button className="text-primary-color hover:text-primary-dark transition-colors">
                        <FaQuestionCircle className="text-xl" />
                    </button>
                </div>
            </div>

            <div className="dashboard-card p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Fee Category</label>
                        <select 
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-color focus:border-transparent transition-all"
                            onChange={(e) => handleInputChange('feeType', e.target.value)}
                        >
                            <option value="">Select category</option>
                            <option value="Tuition Fee">Tuition Fee</option>
                            <option value="Hostel Fee">Hostel Fee</option>
                            <option value="Exam Fee">Exam Fee</option>
                            <option value="Bus Fee">Bus Fee</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Amount (INR)</label>
                        <input 
                            type="number" 
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-color focus:border-transparent transition-all"
                            onChange={(e) => handleInputChange('amount', e.target.value)} 
                            placeholder="Enter amount" 
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {paymentMethods.map((method) => (
                                <div
                                    key={method.id}
                                    onClick={() => handleInputChange('paymentMethod', method.id)}
                                    className={`dashboard-card p-4 cursor-pointer transition-all duration-300
                                        ${formData.paymentMethod === method.id ? 'ring-2 ring-primary-color ring-offset-2' : ''}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl ${formData.paymentMethod === method.id ? 'bg-blue-50' : 'bg-gray-50'}`}>
                                            {method.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold mb-1">{method.name}</h3>
                                            <p className="text-sm text-secondary-color">{method.description}</p>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 ${formData.paymentMethod === method.id ? 'border-primary-color bg-primary-color' : 'border-gray-300'}`}>
                                            {formData.paymentMethod === method.id && (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <FaCheck className="text-white text-xs" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                <AnimatePresence>
                    {formData.paymentMethod === 'qr' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mt-8 flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl"
                        >
                            <div className="mb-4 text-center">
                                <h3 className="text-xl font-semibold mb-2">Scan QR Code to Pay</h3>
                                <p className="text-secondary-color">Use any UPI app to scan and pay</p>
                            </div>
                            <motion.div 
                                className="bg-white p-4 rounded-xl shadow-lg"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <img
                                    src={QRCode}
                                    alt="Payment QR Code"
                                    className="w-64 h-64 object-contain"
                                />
                            </motion.div>
                            <div className="mt-6 flex gap-4">
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="button-primary flex items-center gap-2"
                                >
                                    <FaDownload />
                                    Save QR
                                </motion.button>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="py-2 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                    <FaShare />
                                    Share
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full button-primary py-4 mt-6 text-lg font-medium flex items-center justify-center gap-2"
                    onClick={handleSubmit}
                >
                    <FaCreditCard />
                    Complete Payment
                </motion.button>
            </div>
        </motion.div>
    );
};

export default PaymentOptions;
