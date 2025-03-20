import React, { useState, useEffect } from 'react';
import { FaSearch, FaUserPlus, FaEdit, FaTrash, FaCheck, FaUserGraduate } from 'react-icons/fa';
import axios from 'axios';

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/djcwbfcdl/image/upload";
const UPLOAD_PRESET = "Student_Images"; // Replace with your Cloudinary upload preset

const StudentManagement = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newStudentName, setNewStudentName] = useState('');
    const [studentID, setStudentID] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [yearOfStudy, setYearOfStudy] = useState('');
    const [semester, setSemester] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [editingStudentId, setEditingStudentId] = useState(null);
    const [isAddingStudent, setIsAddingStudent] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        // Fetch students from the backend when the component mounts
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/getstudents');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleAddStudent = async () => {
        // Check if all fields are filled
        if (!newStudentName.trim() || !studentID.trim() || !email.trim() || !department.trim() || !password.trim() || !profileImage.trim() || !yearOfStudy.trim() || !semester.trim() || !contactNumber.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        const newStudent = {
            studentID,
            name: newStudentName,
            email,
            department,
            password,
            profileImage,
            yearOfStudy,
            semester,
            contactNumber,
        };

        try {
            const response = await axios.post('http://localhost:5000/admin/add-student', newStudent);
            alert(response.data.message);
            const studentId = response.data.updatedStudent._id;
            localStorage.setItem('studentId', studentId); // Store the object ID in local storage
            setStudents([...students, { ...newStudent, _id: studentId }]);
            clearInputFields();
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    const handleEditStudent = (id) => {
        const studentToEdit = students.find(student => student._id === id);
        setNewStudentName(studentToEdit.name);
        setStudentID(studentToEdit.studentID);
        setEmail(studentToEdit.email);
        setDepartment(studentToEdit.department);
        setYearOfStudy(studentToEdit.yearOfStudy);
        setSemester(studentToEdit.semester);
        setContactNumber(studentToEdit.contactNumber);
        setProfileImage(studentToEdit.profileImage);
        setEditingStudentId(id);
        setIsAddingStudent(true);
    };

    const handleUpdateStudent = async () => {
        console.log("Update button clicked");
    
        // Check if editingStudentId is set and fields are filled
        if (editingStudentId === null || !newStudentName.trim() || !studentID.trim()) {
            console.error("editingStudentId is null or required fields are empty");
            return;
        }
    
        const updatedStudent = {
            name: newStudentName,
            email,
            department,
        };
    
        console.log("Updating student with ID:", editingStudentId);
        console.log("Updated student data:", updatedStudent);
    
        try {
            const response = await axios.put(
                `http://localhost:5000/admin/edit-student/${editingStudentId}`,
                updatedStudent
            );
            console.log("Update response:", response.data);
            alert(response.data.message);
    
            setStudents(students.map(student =>
                student._id === editingStudentId ? { ...student, ...updatedStudent } : student
            ));
    
            clearInputFields();
        } catch (error) {
            console.error('Error updating student:', error);
            alert('Failed to update student. Please try again.');
        }
    };
    

    const handleRemoveStudent = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/admin/delete-student/${id}`);
            setStudents(students.filter(student => student._id !== id));
        } catch (error) {
            console.error('Error removing student:', error);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            const response = await fetch(CLOUDINARY_URL, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            setProfileImage(data.secure_url);
        } catch (error) {
            console.error("Image upload failed:", error);
        } finally {
            setUploading(false);
        }
    };

    const clearInputFields = () => {
        setNewStudentName('');
        setStudentID('');
        setEmail('');
        setDepartment('');
        setPassword('');
        setProfileImage('');
        setYearOfStudy('');
        setSemester('');
        setContactNumber('');
        setEditingStudentId(null);
        setIsAddingStudent(false);
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentID.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center gap-2 mb-6">
                <FaUserGraduate className="text-blue-600 text-2xl" />
                <h2 className="text-xl font-semibold">Student Management</h2>
            </div>

            <div className="mt-4">
                <div className="flex mb-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search Students by Name or Student ID"
                            className="border rounded-lg pl-10 p-2 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    <button
                        className="ml-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        onClick={() => {
                            console.log("Searching for:", searchTerm);
                        }}
                    >
                        <FaSearch />
                        Search
                    </button>
                </div>

                {isAddingStudent && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter Student Name"
                            className="border rounded-lg p-2 w-full mb-4"
                            value={newStudentName}
                            onChange={(e) => setNewStudentName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter Student ID"
                            className="border rounded-lg p-2 w-full mb-4"
                            value={studentID}
                            onChange={(e) => setStudentID(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="border rounded-lg p-2 w-full mb-4"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter Department"
                            className="border rounded-lg p-2 w-full mb-4"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="border rounded-lg p-2 w-full mb-4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter Year of Study"
                            className="border rounded-lg p-2 w-full mb-4"
                            value={yearOfStudy}
                            onChange={(e) => setYearOfStudy(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter Semester"
                            className="border rounded-lg p-2 w-full mb-4"
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter Contact Number"
                            className="border rounded-lg p-2 w-full mb-4"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                        />
                        <div className="mb-4">
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="p-2 border rounded w-full" />
                            {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                        </div>
                        <div className="flex gap-4 mb-4">
                            <button
                                className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                                onClick={handleUpdateStudent}
                            >
                                <FaCheck />
                                Update Student
                            </button>
                        </div>
                    </>
                )}

                {!isAddingStudent && (
                    <button
                        className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        onClick={() => setIsAddingStudent(true)}
                    >
                        <FaUserPlus />
                        Add Student
                    </button>
                )}

                <h3 className="text-lg font-semibold mt-4">Student List</h3>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Student ID</th>
                                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map(student => (
                                    <tr key={student._id} className="border-b">
                                        <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{student.studentID}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <div className="flex justify-center gap-6">
                                                <button
                                                    className="text-yellow-500 hover:text-yellow-600 flex items-center gap-1"
                                                    onClick={() => handleEditStudent(student._id)}
                                                >
                                                    <FaEdit />
                                                    Edit
                                                </button>
                                                <button
                                                    className="text-red-500 hover:text-red-600 flex items-center gap-1"
                                                    onClick={() => handleRemoveStudent(student._id)}
                                                >
                                                    <FaTrash />
                                                    Remove
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentManagement;
