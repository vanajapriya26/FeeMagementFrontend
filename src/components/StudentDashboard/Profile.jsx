// src/components/StudentDashboard/Profile.js

import React, { useState } from 'react';
import { 
    FaUser, 
    FaEnvelope, 
    FaIdCard, 
    FaGraduationCap, 
    FaPhone, 
    FaEdit, 
    FaSave, 
    FaTimes,
    FaCamera
} from 'react-icons/fa';

const Profile = () => {
    // Dummy data
    const dummyStudent = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        id: 'S123456',
        department: 'Computer Science',
        contactNumber: '123-456-7890',
        avatar: null // For profile picture
    };

    const [studentData, setStudentData] = useState(dummyStudent);
    const [isEditing, setIsEditing] = useState(false);
    const [tempData, setTempData] = useState(dummyStudent);
    const [avatar, setAvatar] = useState(null);

    // Handle file input for profile picture
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e, field) => {
        setTempData({
            ...tempData,
            [field]: e.target.value
        });
    };

    const handleUpdate = () => {
        // Validation
        if (!tempData.name.trim() || !tempData.email.trim() || !tempData.contactNumber.trim()) {
            alert('Please fill in all required fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(tempData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Phone number validation
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(tempData.contactNumber)) {
            alert('Please enter a valid phone number (format: 123-456-7890)');
            return;
        }

        setStudentData({ ...tempData, avatar });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempData(studentData);
        setIsEditing(false);
    };

    const InfoField = ({ icon, label, value }) => (
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <div>
                <p className="text-gray-600 text-sm">{label}</p>
                <p className="font-semibold">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-6">
                <FaUser className="text-blue-600 text-2xl" />
                <h2 className="text-2xl font-semibold">Profile Information</h2>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Profile Picture Section */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                            {avatar || studentData.avatar ? (
                                <img 
                                    src={avatar || studentData.avatar} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <FaUser className="text-gray-400 text-4xl" />
                            )}
                        </div>
                        {isEditing && (
                            <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600">
                                <FaCamera className="text-white" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                            </label>
                        )}
                    </div>
                </div>

                {!isEditing ? (
                    // Display Mode
                    <div>
                        <InfoField 
                            icon={<FaUser className="text-blue-500" />}
                            label="Full Name"
                            value={studentData.name}
                        />
                        <InfoField 
                            icon={<FaIdCard className="text-green-500" />}
                            label="Student ID"
                            value={studentData.id}
                        />
                        <InfoField 
                            icon={<FaEnvelope className="text-red-500" />}
                            label="Email"
                            value={studentData.email}
                        />
                        <InfoField 
                            icon={<FaGraduationCap className="text-purple-500" />}
                            label="Department"
                            value={studentData.department}
                        />
                        <InfoField 
                            icon={<FaPhone className="text-yellow-500" />}
                            label="Contact Number"
                            value={studentData.contactNumber}
                        />

                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center gap-2"
                        >
                            <FaEdit />
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    // Edit Mode
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Full Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={tempData.name}
                                    onChange={(e) => handleInputChange(e, 'name')}
                                    className="pl-10 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <FaUser className="absolute left-3 top-3 text-gray-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={tempData.email}
                                    onChange={(e) => handleInputChange(e, 'email')}
                                    className="pl-10 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Contact Number</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={tempData.contactNumber}
                                    onChange={(e) => handleInputChange(e, 'contactNumber')}
                                    className="pl-10 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <FaPhone className="absolute left-3 top-3 text-gray-400" />
                            </div>
                        </div>

                        <div className="flex gap-2 mt-6">
                            <button
                                onClick={handleUpdate}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 flex items-center gap-2"
                            >
                                <FaSave />
                                Save Changes
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200 flex items-center gap-2"
                            >
                                <FaTimes />
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;