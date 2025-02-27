import React, { useState, useEffect } from 'react';
import {
    FaUser, FaEnvelope, FaIdCard, FaGraduationCap, FaPhone,
    FaEdit, FaSave, FaTimes, FaCamera, FaSun, FaMoon, FaCalendar
} from 'react-icons/fa';
import { useFee } from '../../context/FeeContext';
import profileImage from '../../assests/me.jpeg';
import defaultAvatar1 from '../../assests/2121A05D3.png';
import defaultAvatar2 from '../../assests/21A21A05D4.png';
import defaultAvatar3 from '../../assests/21A21A05D5.png';
import defaultAvatar4 from '../../assests/21A21A05D6.png';
import defaultAvatar5 from '../../assests/21A21A05D7.png';
import defaultAvatar6 from '../../assests/21A21A05D8.png';
import defaultAvatar7 from '../../assests/21A21A05D9.png';
import defaultAvatar8 from '../../assests/21A21A05E0.png';
import defaultAvatar9 from '../../assests/21A21A05E1.png';

const Profile = () => {
    const { currentStudent, feeCategories, addFeeCategory } = useFee();
    const newFeeCategory = { name: 'Default Category', amount: 0 }; // Define newFeeCategory

    const defaultStudentData = {
        name: currentStudent?.name || '',
        email: currentStudent?.email || '',
        id: currentStudent?.regNo || '',
        department: currentStudent?.department || '',
        year: `${currentStudent?.yearOfStudy || ''}${currentStudent?.yearOfStudy ? ' Year' : ''}`,
        semester: `${currentStudent?.semester || ''}${currentStudent?.semester ? 'th Semester' : ''}`,
        contactNumber: currentStudent?.contactNumber || '',
        avatar: currentStudent?.avatar || profileImage // Use avatar from context
    };

    const [studentData, setStudentData] = useState(defaultStudentData);
    const [isEditing, setIsEditing] = useState(false);
    const [tempData, setTempData] = useState(defaultStudentData);
    const [avatar, setAvatar] = useState(defaultStudentData.avatar); // Set default avatar
    const [darkMode, setDarkMode] = useState(false);

    // Mapping of student IDs to their respective default avatars
    const defaultAvatars = {
        '21A21A05D3': defaultAvatar1, // Corrected the typo here
        '21A21A05D4': defaultAvatar2,
        '21A21A05D5': defaultAvatar3,
        '21A21A05D6': defaultAvatar4,
        '21A21A05D7': defaultAvatar5,
        '21A21A05D8': defaultAvatar6,
        '21A21A05D9': defaultAvatar7,
        '21A21A05E0': defaultAvatar8,
        '21A21A05E1': defaultAvatar9,
    };

    useEffect(() => {
        if (currentStudent) {
            console.log(`Current Student Avatar: ${currentStudent?.avatar}`);
            console.log(`Avatar State: ${avatar}`);
            console.log(`Default Avatar: ${defaultStudentData.avatar}`);
            addFeeCategory(newFeeCategory); // Call addFeeCategory here
            const updatedData = {
                ...defaultStudentData,
                name: currentStudent.name,
                email: currentStudent.email,
                id: currentStudent.regNo,
                department: currentStudent.department,
                year: `${currentStudent.yearOfStudy} Year`,
                semester: `${currentStudent.semester}th Semester`,
                contactNumber: currentStudent.contactNumber,
                avatar: currentStudent.avatar // Update avatar
            };
            setStudentData(updatedData);
            setTempData(updatedData);
            setAvatar(currentStudent.avatar); // Update avatar state
        }
    }, [currentStudent]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatar(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e, field) => {
        setTempData({ ...tempData, [field]: e.target.value });
    };

    const handleUpdate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!tempData.name.trim() || !tempData.email.trim() || !tempData.contactNumber.trim()) {
            alert('Please fill in all required fields');
            return;
        }
        if (!emailRegex.test(tempData.email)) {
            alert('Please enter a valid email address');
            return;
        }
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

    const handleImageError = (e) => {
        const defaultAvatar = defaultAvatars[studentData.id] || profileImage;
        e.target.onerror = null; // Prevent infinite loop
        e.target.src = defaultAvatar;
        console.error(`Failed to load image: ${avatar}. Using default avatar: ${defaultAvatar}`);
    };

    return (
        <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen p-6 rounded-lg shadow-md`}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Profile Information</h2>
                <button onClick={() => setDarkMode(!darkMode)} className="text-2xl">
                    {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                            <img
                                src={avatar}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                            />
                        </div>
                        {isEditing && (
                            <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600">
                                <FaCamera className="text-white" />
                                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                            </label>
                        )}
                    </div>
                </div>

                {!isEditing ? (
                    <div>
                        {[['Full Name', studentData.name, FaUser], ['Student ID', studentData.id, FaIdCard],
                          ['Email', studentData.email, FaEnvelope], ['Department', studentData.department, FaGraduationCap],
                          ['Year of Study', studentData.year, FaCalendar], ['Semester', studentData.semester, FaCalendar],
                          ['Contact Number', studentData.contactNumber, FaPhone]].map(([label, value, Icon], idx) => (
                            <div key={idx} className="flex items-center gap-3 mb-4">
                                <Icon className="text-blue-500" />
                                <div>
                                    <p className="text-gray-600 text-sm">{label}</p>
                                    <p className="font-semibold">{value}</p>
                                </div>
                            </div>
                        ))}

                        <button onClick={() => setIsEditing(true)} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
                            <FaEdit /> Edit Profile
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {[['Full Name', 'name', FaUser], ['Email', 'email', FaEnvelope], ['Year of Study', 'year', FaCalendar],
                          ['Semester', 'semester', FaCalendar], ['Contact Number', 'contactNumber', FaPhone]].map(([label, field, Icon], idx) => (
                            <div key={idx}>
                                <label className="block text-gray-700 mb-2">{label}</label>
                                <div className="relative">
                                    <input
                                        type={field === 'email' ? 'email' : 'text'}
                                        value={tempData[field]}
                                        onChange={(e) => handleInputChange(e, field)}
                                        className="pl-10 p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                                    />
                                    <Icon className="absolute left-3 top-3 text-gray-400" />
                                </div>
                            </div>
                        ))}
                        <div className="flex gap-2 mt-6">
                            <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2">
                                <FaSave /> Save Changes
                            </button>
                            <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2">
                                <FaTimes /> Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
