// src/components/StudentDashboard/Support.js

import React, { useState } from 'react';
import { 
    FaQuestionCircle, 
    FaEnvelope, 
    FaPhone, 
    FaWhatsapp,
    FaComments,
    FaPaperPlane,
    FaChevronDown,
    FaChevronUp,
    FaClock,
    FaMapMarkerAlt
} from 'react-icons/fa';

const Support = () => {
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [ticketForm, setTicketForm] = useState({
        subject: '',
        message: '',
        priority: 'normal'
    });

    // FAQ data
    const faqs = [
        {
            id: 1,
            question: 'How do I pay my fees?',
            answer: 'You can pay your fees through various methods: UPI, Net Banking, or Credit/Debit Card. Visit the Payment Options section for detailed instructions.'
        },
        {
            id: 2,
            question: 'What should I do if I encounter an issue with payment?',
            answer: 'If you face any payment issues, please take a screenshot of the error, note down the transaction ID (if any), and contact our support team immediately.'
        },
        {
            id: 3,
            question: 'How can I get my payment receipt?',
            answer: 'Payment receipts are automatically generated and can be downloaded from the Fee Payment Status section after successful payment.'
        },
        {
            id: 4,
            question: 'What are the payment deadlines?',
            answer: 'Payment deadlines are displayed in the Upcoming Payments section. Make sure to pay before the due date to avoid late fees.'
        }
    ];

    // Support contact information
    const contactInfo = {
        email: 'support@college.edu',
        phone: '(123) 456-7890',
        whatsapp: '+91 98765 43210',
        hours: '9:00 AM - 5:00 PM (Mon-Fri)',
        location: 'Admin Block, Ground Floor'
    };

    const handleTicketSubmit = (e) => {
        e.preventDefault();
        if (!ticketForm.subject.trim() || !ticketForm.message.trim()) {
            alert('Please fill in all required fields');
            return;
        }
        
        console.log('Support ticket submitted:', ticketForm);
        // Add API call here
        
        // Reset form
        setTicketForm({
            subject: '',
            message: '',
            priority: 'normal'
        });
        alert('Your support ticket has been submitted successfully!');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-6">
                <FaQuestionCircle className="text-blue-600 text-2xl" />
                <h2 className="text-2xl font-semibold">Support & Help</h2>
            </div>

            {/* FAQs Section */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    {faqs.map(faq => (
                        <div key={faq.id} className="border rounded-lg">
                            <button
                                className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                                onClick={() => setSelectedFaq(selectedFaq === faq.id ? null : faq.id)}
                            >
                                <span className="font-medium">{faq.question}</span>
                                {selectedFaq === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                            {selectedFaq === faq.id && (
                                <div className="p-4 bg-gray-50 border-t">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Information */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-3">
                        <p className="flex items-center gap-2">
                            <FaEnvelope className="text-blue-500" />
                            <a href={`mailto:${contactInfo.email}`} className="text-blue-500 hover:underline">
                                {contactInfo.email}
                            </a>
                        </p>
                        <p className="flex items-center gap-2">
                            <FaPhone className="text-green-500" />
                            <a href={`tel:${contactInfo.phone}`} className="text-blue-500 hover:underline">
                                {contactInfo.phone}
                            </a>
                        </p>
                        <p className="flex items-center gap-2">
                            <FaWhatsapp className="text-green-500" />
                            {contactInfo.whatsapp}
                        </p>
                        <p className="flex items-center gap-2">
                            <FaClock className="text-gray-500" />
                            {contactInfo.hours}
                        </p>
                        <p className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-red-500" />
                            {contactInfo.location}
                        </p>
                    </div>
                </div>

                {/* Support Ticket Form */}
                <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Submit a Support Ticket</h3>
                    <form onSubmit={handleTicketSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Subject</label>
                            <input
                                type="text"
                                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                                value={ticketForm.subject}
                                onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                                placeholder="Enter subject"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Message</label>
                            <textarea
                                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                                rows="4"
                                value={ticketForm.message}
                                onChange={(e) => setTicketForm({...ticketForm, message: e.target.value})}
                                placeholder="Describe your issue"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Priority</label>
                            <select
                                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                                value={ticketForm.priority}
                                onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                            >
                                <option value="low">Low</option>
                                <option value="normal">Normal</option>
                                <option value="high">High</option>
                                <option value="urgent">Urgent</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center gap-2"
                        >
                            <FaPaperPlane />
                            Submit Ticket
                        </button>
                    </form>
                </div>
            </div>

            {/* Live Chat Button */}
            <div className="text-center">
                <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-200 flex items-center gap-2 mx-auto">
                    <FaComments />
                    Start Live Chat
                </button>
            </div>
        </div>
    );
};

export default Support;