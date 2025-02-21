import React, { createContext, useContext, useState, useEffect } from 'react';

const FeeContext = createContext();

export const useFee = () => {
    const context = useContext(FeeContext);
    if (!context) {
        throw new Error('useFee must be used within a FeeProvider');
    }
    return context;
};

// Create an error boundary component
class FeeErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('FeeContext Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div className="p-4 text-red-600">Something went wrong. Please refresh the page.</div>;
        }
        return this.props.children;
    }
}

export const FeeProvider = ({ children }) => {
    // Initialize state from localStorage with error handling
    const initializeState = (key, defaultValue) => {
        try {
            if (typeof window === 'undefined' || !window.localStorage) {
                console.warn('localStorage is not available');
                return defaultValue;
            }
            const saved = localStorage.getItem(key);
            if (!saved) return defaultValue;
            const parsed = JSON.parse(saved);
            return Array.isArray(parsed) ? parsed : defaultValue;
        } catch (error) {
            console.error(`Error loading ${key} from localStorage:`, error);
            return defaultValue;
        }
    };

    const [feeCategories, setFeeCategories] = useState(() =>
        initializeState('feeCategories', [])
    );

    const [upcomingPayments, setUpcomingPayments] = useState(() =>
        initializeState('upcomingPayments', [])
    );

    const [notifications, setNotifications] = useState(() =>
        initializeState('notifications', [])
    );

    const [currentStudent, setCurrentStudent] = useState(null);

    const [students] = useState([
        {
            id: 1,
            regNo: '21A21A05D3',
            name: 'Abhilash',
            email: 'akh@gmail.com',
            yearOfStudy: 4,
            semester: 8,
            department: 'CSE',
            contactNumber: '9986636322',
            photo: '/assests/21A21A05D3.png' // Use relative path
        },
        {
            id: 2,
            regNo: '21A21A05D4',
            name: 'K Dedeepya',
            email: 'dedeepya@gmail.com',
            yearOfStudy: 4,
            semester: 8,
            department: 'CSE',
            contactNumber: '8536727326',
            photo: '/assests/21A21A05D4.png' // Use relative path
        },
        {
            id: 3,
            regNo: '21A21A05D5',
            name: 'T Lahari',
            email: 'lahari@gmail.com',
            yearOfStudy: 4,
            semester: 8,
            department: 'CSE',
            contactNumber: '9355252662',
            photo: '/assests/21A21A05D5.png' // Use relative path
        },
        {
            id: 4,
            regNo: '21A21A05D6',
            name: 'P Ramu',
            email: 'Ramu@gmail.com',
            yearOfStudy: 4,
            semester: 8,
            department: 'CSE',
            contactNumber: '8363637377',
            photo: '/assests/21A21A05D6.png' // Use relative path
        },
        {
            id: 5,
            regNo: '21A21A05D7',
            name: 'P Sowmya',
            email: 'Sowmya@gmail.com',
            yearOfStudy: 4,
            semester: 8,
            department: 'CSE',
            contactNumber: '8363635552',
            photo: '/assests/21A21A05D7.png' // Use relative path
        },
        {
            id: 6,
            regNo: '21A21A05D8',
            name: 'P Eswari',
            email: 'Eswari@gmail.com',
            yearOfStudy: 4,
            semester: 8,
            department: 'CSE',
            contactNumber: '8363938373',
            photo: '/assests/21A21A05D8.png' // Use relative path
        },
        {
            id: 7,
            regNo: '21A21A05D9',
            name: 'P Mohan Kumar',
            email: 'Mohankumar@gmail.com',
            yearOfStudy: 4,
            semester: 8,
            department: 'CSE',
            contactNumber: '9663535252',
            photo: '/assests/21A21A05D9.png' // Use relative path
        },
        {
            id: 8,
            regNo: '21A21A05E0',
            name: 'P Raja Sekhar',
            email: 'Sekhar@gmail.com',
            yearOfStudy: 4,
            semester: 8,
            department: 'CSE',
            contactNumber: '97542562782',
            photo: '/assests/21A21A05E0.png' // Use relative path
        },
        {
            id: 9,
            regNo: '21A21A05E1',
            name: 'P Hemani',
            email: 'Hemani@gmail.com',
            yearOfStudy: 4,
            semester: 8,
            department: 'CSE',
            contactNumber: '86522672888',
            photo: '/assests/21A21A05E1.png' // Use relative path
        }
    ]);

    // Save to localStorage whenever state changes
    const saveToLocalStorage = (key, value) => {
        try {
            if (typeof window === 'undefined' || !window.localStorage) {
                console.warn('localStorage is not available');
                return;
            }
            if (!Array.isArray(value)) {
                console.error(`Invalid value type for ${key}. Expected array.`);
                return;
            }
            localStorage.setItem(key, JSON.stringify(value));
            console.log(`Saved ${key} to localStorage:`, value);
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
        }
    };

    useEffect(() => {
        saveToLocalStorage('feeCategories', feeCategories);
    }, [feeCategories]);

    useEffect(() => {
        saveToLocalStorage('upcomingPayments', upcomingPayments);
    }, [upcomingPayments]);

    useEffect(() => {
        saveToLocalStorage('notifications', notifications);
    }, [notifications]);

    const addNotification = (notification) => {
        setNotifications(prev => [...prev, { ...notification, read: false }]);
    };

    const removeNotification = (notificationId) => {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
    };

    const markNotificationAsRead = (notificationId) => {
        setNotifications(prev => prev.map(n =>
            n.id === notificationId ? { ...n, read: true } : n
        ));
    };

    const loginStudent = (registerId) => {
        console.log('Attempting to login with ID:', registerId);
        const student = students.find(s => s.regNo === registerId);
        console.log('Found student:', student);

        if (student) {
            setCurrentStudent({
                ...student,
                avatar: student.photo // Set the avatar from the student's photo
            });
            return true;
        }
        return false;
    };

    const logoutStudent = () => {
        setCurrentStudent(null);
    };

    const getStudentPayments = (studentId) => {
        return upcomingPayments.filter(payment => payment.studentId === studentId);
    };

    const addFeeCategory = (newCategory) => {
        const existingCategory = feeCategories.find(category => category.name === newCategory.name);
        if (existingCategory) {
            console.error(`Fee category with name "${newCategory.name}" already exists.`);
            return;
        }
        setFeeCategories(prevCategories => [...prevCategories, newCategory]);
    };

    const removeFeeCategory = (categoryId) => {
        setFeeCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
    };

    const contextValue = {
        feeCategories,
        setFeeCategories,
        addFeeCategory,
        removeFeeCategory,
        upcomingPayments,
        setUpcomingPayments,
        notifications,
        setNotifications,
        addNotification,
        removeNotification,
        markNotificationAsRead,
        currentStudent,
        setCurrentStudent,
        loginStudent,
        logoutStudent,
        students,
        getStudentPayments
    };

    return (
        <FeeContext.Provider value={contextValue}>
            {children}
        </FeeContext.Provider>
    );
};

export const SafeFeeProvider = ({ children }) => {
    return (
        <FeeErrorBoundary>
            <FeeProvider>{children}</FeeProvider>
        </FeeErrorBoundary>
    );
};

export default SafeFeeProvider;
