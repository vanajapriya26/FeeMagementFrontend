import React, { useState, useEffect } from 'react';
import {
  FaUser, FaEnvelope, FaIdCard, FaGraduationCap, FaPhone,
  FaEdit, FaSave, FaTimes, FaCamera, FaSun, FaMoon, FaCalendar
} from 'react-icons/fa';
import axios from 'axios';

const Profile = () => {
  const defaultStudentData = {
    name: '',
    email: '',
    id: '',
    department: '',
    year: '',
    semester: '',
    contactNumber: '',
    avatar: 'https://res.cloudinary.com/djcwbfcdl/image/upload/v1742056127/D3_efrmdz.png'
  };

  const [studentData, setStudentData] = useState(defaultStudentData);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(defaultStudentData);
  const [avatar, setAvatar] = useState(defaultStudentData.avatar);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      // First try to get the student data from localStorage
      const storedStudent = localStorage.getItem('student');
      const token = localStorage.getItem('token');
      
      if (storedStudent && token) {
        try {
          // Parse the stored student data
          const studentInfo = JSON.parse(storedStudent);
          
          // Store the student ID for API calls
          if (studentInfo.id) {
            localStorage.setItem('studentId', studentInfo.id);
          }
          
          // Try to get more detailed student info from the API
          const response = await axios.get(`http://localhost:5000/students/getstudent/${studentInfo.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          const updatedData = {
            ...defaultStudentData,
            name: response.data.name || studentInfo.name,
            email: response.data.email || studentInfo.email,
            id: response.data.studentID || studentInfo.studentID,
            department: response.data.department || studentInfo.department,
            year: response.data.yearOfStudy ? `${response.data.yearOfStudy} Year` : '',
            semester: response.data.semester ? `${response.data.semester} Semester` : '',
            contactNumber: response.data.contactNumber || '',
            avatar: response.data.profileImage || defaultStudentData.avatar
          };
          
          setStudentData(updatedData);
          setTempData(updatedData);
          setAvatar(response.data.profileImage || defaultStudentData.avatar);
        } catch (error) {
          console.error('Failed to fetch student data:', error);
          
          // If API call fails, use the data from localStorage
          if (storedStudent) {
            const studentInfo = JSON.parse(storedStudent);
            const fallbackData = {
              ...defaultStudentData,
              name: studentInfo.name || '',
              email: studentInfo.email || '',
              id: studentInfo.studentID || studentInfo.id || '',
              department: studentInfo.department || '',
            };
            
            setStudentData(fallbackData);
            setTempData(fallbackData);
          }
        }
      } else {
        // If no stored student data, try to get it from the API using studentId
        const studentId = localStorage.getItem('studentId');
        if (studentId && token) {
          try {
            const response = await axios.get(`http://localhost:5000/students/getstudent/${studentId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            
            const updatedData = {
              ...defaultStudentData,
              name: response.data.name,
              email: response.data.email,
              id: response.data.studentID,
              department: response.data.department,
              year: response.data.yearOfStudy ? `${response.data.yearOfStudy} Year` : '',
              semester: response.data.semester ? `${response.data.semester} Semester` : '',
              contactNumber: response.data.contactNumber || '',
              avatar: response.data.profileImage || defaultStudentData.avatar
            };
            
            setStudentData(updatedData);
            setTempData(updatedData);
            setAvatar(response.data.profileImage || defaultStudentData.avatar);
          } catch (error) {
            console.error('Failed to fetch student data:', error);
          }
        }
      }
    };

    fetchStudentData();
  }, []);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'Student Images');

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/djcwbfcdl/upload', formData);
        setAvatar(response.data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
      }
    }
  };

  const handleUpdate = async () => {
    const studentId = localStorage.getItem('studentId');
    const token = localStorage.getItem('token');
    
    if (studentId && token) {
      try {
        const response = await axios.put(`http://localhost:5000/students/updatestudent/${studentId}`, 
          {
            name: tempData.name,
            email: tempData.email,
            yearOfStudy: parseInt(tempData.year.split(' ')[0]),
            semester: parseInt(tempData.semester.split(' ')[0]),
            contactNumber: tempData.contactNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        setStudentData({ ...tempData, avatar });
        setIsEditing(false);
        
        // Update the student data in localStorage
        const storedStudent = localStorage.getItem('student');
        if (storedStudent) {
          const studentInfo = JSON.parse(storedStudent);
          const updatedStudentInfo = {
            ...studentInfo,
            name: tempData.name,
            email: tempData.email
          };
          localStorage.setItem('student', JSON.stringify(updatedStudentInfo));
        }
      } catch (error) {
        console.error('Failed to update student data:', error);
        alert('Failed to update profile');
      }
    }
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
              <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
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
                      onChange={(e) => setTempData({ ...tempData, [field]: e.target.value })}
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
              <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2">
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
