import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFee } from '../../context/FeeContext';
import bgImage from '../../assests/img.jpg';
import { loginAdmin, loginStudent } from '../../services/api';
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
    const { setCurrentStudent } = useFee();
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (isSignup) {
            if (isAdmin) {
                if (formData.password !== formData.confirmPassword) {
                    setError('Passwords do not match!');
                    setLoading(false);
                    return;
                }
                if (!formData.email || !formData.password || !formData.name) {
                    setError('Please fill in all required fields');
                    setLoading(false);
                    return;
                }
            } else {
                if (!formData.email || !formData.password || !formData.name || !formData.registerId || !formData.department) {
                    setError('Please fill in all required fields');
                    setLoading(false);
                    return;
                }
            }
        } else {
            if (isAdmin) {
                if (!formData.name || !formData.password || !formData.adminCode) {
                    setError('Please fill in all required fields');
                    setLoading(false);
                    return;
                }
            } else {
                if (!formData.registerId || !formData.password) {
                    setError('Please fill in all required fields');
                    setLoading(false);
                    return;
                }
            }
        }

        if (!isSignup) {
            try {
                let response;
                if (isAdmin) {
                    console.log('Admin Login Request:', {
                        name: formData.name,
                        password: formData.password,
                        adminCode: formData.adminCode,
                    });

                    response = await loginAdmin(formData.name, formData.password, formData.adminCode);
                    console.log('Admin Login Response:', response);
                    
                    props.onLogin('admin');
                    navigate('/admin-dashboard');
                } else {
                    console.log('Student Login Request:', {
                        studentID: formData.registerId,
                        password: formData.password,
                    });
                    
                    response = await loginStudent(formData.registerId, formData.password);
                    console.log('Student Login Response:', response);
                    
                    // Set the current student in context
                    if (response.student) {
                        setCurrentStudent(response.student);
                    }
                    
                    props.onLogin('student');
                    navigate('/student-dashboard');
                }
            } catch (error) {
                console.error('Error during login:', error);
                setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
            } finally {
                setLoading(false);
            }
        } else {
            alert('Account created successfully! Please login.');
            setIsSignup(false);
            setLoading(false);
        }

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
        <div className="min-h-screen relative overflow-hidden" style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md relative transition-all duration-300 hover:shadow-indigo-200">
                    <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
                        {isAdmin ? (isSignup ? 'Admin Create Account' : 'Admin Login') : (isSignup ? 'Student Create Account' : 'Student Login')}
                    </h2>

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

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6">
                        {!isSignup && !isAdmin && (
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

                        {!isSignup && isAdmin && (
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
                                    type="password"
                                    name="adminCode"
                                    placeholder="Admin Code"
                                    value={formData.adminCode}
                                    onChange={handleChange}
                                />
                            </>
                        )}

                        {isSignup && !isAdmin && (
                            <>
                                <InputField
                                    icon={<FaUser />}
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <InputField
                                    icon={<FaEnvelope />}
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <InputField
                                    icon={<FaIdCard />}
                                    type="text"
                                    name="registerId"
                                    placeholder="Registration ID"
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

                        {isSignup && isAdmin && (
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
                                    placeholder="Email Address"
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
                                <InputField
                                    icon={<FaKey />}
                                    type="password"
                                    name="adminCode"
                                    placeholder="Admin Code"
                                    value={formData.adminCode}
                                    onChange={handleChange}
                                />
                            </>
                        )}

                        <button
                            type="submit"
                            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 text-white font-semibold transition-all duration-300 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <span>Processing...</span>
                            ) : (
                                <>
                                    {isSignup ? <FaUserPlus /> : <FaSignInAlt />}
                                    {isSignup ? 'Create Account' : 'Login'}
                                </>
                            )}
                        </button>

                        <div className="text-center mt-4">
                            <button
                                type="button"
                                onClick={() => setIsSignup(!isSignup)}
                                className="text-blue-600 hover:underline transition-colors duration-300"
                            >
                                {isSignup ? 'Already have an account? Login' : 'Need an account? Sign Up'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
