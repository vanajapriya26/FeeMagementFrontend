// src/components/login/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FaUser, 
    FaUserShield, 
    FaEnvelope, 
    FaLock, 
    FaIdCard, 
    FaBuilding, 
    FaKey,
    FaUserPlus,
    FaSignInAlt
} from 'react-icons/fa';

// Move InputField outside the main component
const InputField = ({ icon, type, name, placeholder, value, onChange }) => (
    <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
        </div>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
    </div>
);

const Login = (props) => {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        registerId: '',
        department: '',
        adminCode: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Form validation
        if (isSignup) {
            // Signup validation
            if (isAdmin) {
                if (formData.password !== formData.confirmPassword) {
                    alert('Passwords do not match!');
                    return;
                }
                if (!formData.email || !formData.password || !formData.name) {
                    alert('Please fill in all required fields');
                    return;
                }
            } else {
                if (!formData.email || !formData.password || !formData.name || !formData.registerId || !formData.department) {
                    alert('Please fill in all required fields');
                    return;
                }
            }
        } else {
            // Login validation
            if (isAdmin) {
                if (!formData.name || !formData.password || !formData.adminCode) {
                    alert('Please fill in all required fields');
                    return;
                }
            } else {
                if (!formData.registerId || !formData.password) {
                    alert('Please fill in all required fields');
                    return;
                }
            }
        }

        console.log('Submitted Details:', formData);
        
        // Navigate to appropriate dashboard
        if (!isSignup) {
            if (isAdmin) {
                props.onLogin('admin');
                navigate('/admin-dashboard');
            } else {
                props.onLogin('student');
                navigate('/student-dashboard');
            }
        } else {
            alert('Account created successfully! Please login.');
            setIsSignup(false);
        }
        
        // Reset form
        setFormData({
            email: '',
            password: '',
            name: '',
            registerId: '',
            department: '',
            adminCode: '',
            confirmPassword: '',
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
                    {isAdmin ? (isSignup ? 'Admin Create Account' : 'Admin Login') : (isSignup ? 'Student Create Account' : 'Student Login')}
                </h2>
                
                {/* Toggle between Admin and Student */}
                <div className="flex justify-center mb-4">
                    <button
                        onClick={() => {
                            setIsAdmin(false);
                            setIsSignup(false);
                        }}
                        className={`flex-1 py-2 rounded-l-lg flex items-center justify-center gap-2
                            ${!isAdmin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        <FaUser />
                        Student
                    </button>
                    <button
                        onClick={() => {
                            setIsAdmin(true);
                            setIsSignup(false);
                        }}
                        className={`flex-1 py-2 rounded-r-lg flex items-center justify-center gap-2
                            ${isAdmin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        <FaUserShield />
                        Admin
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-6">
                    {isSignup && !isAdmin && ( // Student Create Account
                        <>
                            <InputField 
                                icon={<FaUser />} 
                                type="text" 
                                name="name" 
                                placeholder="Student Name" 
                                value={formData.name} 
                                onChange={handleChange}
                            />
                            <InputField 
                                icon={<FaEnvelope />} 
                                type="email" 
                                name="email" 
                                placeholder="Student Email" 
                                value={formData.email} 
                                onChange={handleChange}
                            />
                            <InputField 
                                icon={<FaIdCard />} 
                                type="text" 
                                name="registerId" 
                                placeholder="Student ID" 
                                value={formData.registerId} 
                                onChange={handleChange}
                            />
                            <InputField 
                                icon={<FaBuilding />} 
                                type="text" 
                                name="department" 
                                placeholder="Department" 
                                value={formData.department} 
                                onChange={handleChange}
                            />
                            <InputField 
                                icon={<FaLock />} 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={formData.password} 
                                onChange={handleChange}
                            />
                        </>
                    )}
                    {!isSignup && !isAdmin && ( // Student Login
                        <>
                            <InputField 
                                icon={<FaIdCard />} 
                                type="text" 
                                name="registerId" 
                                placeholder="Student ID" 
                                value={formData.registerId} 
                                onChange={handleChange}
                            />
                            <InputField 
                                icon={<FaLock />} 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={formData.password} 
                                onChange={handleChange}
                            />
                        </>
                    )}
                    {isAdmin && isSignup && ( // Admin Create Account
                        <>
                            <InputField 
                                icon={<FaUser />} 
                                type="text" 
                                name="name" 
                                placeholder="Admin Name" 
                                value={formData.name} 
                                onChange={handleChange}
                            />
                            <InputField 
                                icon={<FaEnvelope />} 
                                type="email" 
                                name="email" 
                                placeholder="Admin Email" 
                                value={formData.email} 
                                onChange={handleChange}
                            />
                            <InputField 
                                icon={<FaLock />} 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={formData.password} 
                                onChange={handleChange}
                            />
                            <InputField 
                                icon={<FaLock />} 
                                type="password" 
                                name="confirmPassword" 
                                placeholder="Confirm Password" 
                                value={formData.confirmPassword} 
                                onChange={handleChange}
                            />
                        </>
                    )}
                    {isAdmin && !isSignup && ( // Admin Login
                        <>
                            <InputField 
                                icon={<FaUser />} 
                                type="text" 
                                name="name" 
                                placeholder="Admin Name" 
                                value={formData.name} 
                                onChange={handleChange}
                            />
                            <InputField 
                                icon={<FaLock />} 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={formData.password} 
                                onChange={handleChange}
                            />
                            <InputField 
                                icon={<FaKey />} 
                                type="text" 
                                name="adminCode" 
                                placeholder="Admin Code" 
                                value={formData.adminCode} 
                                onChange={handleChange}
                            />
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        {isSignup ? <FaUserPlus /> : <FaSignInAlt />}
                        {isSignup ? 'Sign Up' : 'Login'}
                    </button>
                </form>

                <button
                    onClick={() => setIsSignup(!isSignup)}
                    className="mt-4 text-blue-500 hover:underline w-full text-center flex items-center justify-center gap-2"
                >
                    {isSignup ? 'Already have an account? Login' : 'Create an account'}
                </button>
            </div>
        </div>
    );
};

export default Login;