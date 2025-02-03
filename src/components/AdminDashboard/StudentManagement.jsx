// src/components/AdminDashboard/StudentManagement.jsx

import React, { useState } from 'react';
import { FaSearch, FaUserPlus, FaEdit, FaTrash, FaCheck, FaUserGraduate } from 'react-icons/fa';

const StudentManagement = () => {
    const [students, setStudents] = useState([
        { id: 1, name: 'Student #1', registerId: 'REG001' },
        { id: 2, name: 'Student #2', registerId: 'REG002' },
        { id: 3, name: 'Student #3', registerId: 'REG003' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newStudentName, setNewStudentName] = useState('');
    const [newRegisterId, setNewRegisterId] = useState(''); // State for Register ID
    const [editingStudentId, setEditingStudentId] = useState(null);
    const [isAddingStudent, setIsAddingStudent] = useState(false); // State to control visibility of the input field

    const handleAddStudent = () => {
        // Check if both fields are filled
        if (newStudentName.trim() === '' || newRegisterId.trim() === '') {
            alert("Please enter both student name and register ID.");
            return;
        }

        console.log("at add button fun");

        // Create a new student object
        const newStudent = {
            id: students.length + 1, // Simple ID generation
            name: newStudentName,
            registerId: newRegisterId,
        };

        
        console.log(newStudent);

        // Update the students state
        setStudents([...students, newStudent]);

        console.log(...students);
        // Clear input fields
        setNewStudentName('');
        setNewRegisterId('');
        setIsAddingStudent(false); // Hide the input field after adding
    };

    const handleEditStudent = (id) => {
        const studentToEdit = students.find(student => student.id === id);
        setNewStudentName(studentToEdit.name);
        setNewRegisterId(studentToEdit.registerId); // Set Register ID for editing
        setEditingStudentId(id);
        setIsAddingStudent(true); // Show input field when editing
    };

    const handleUpdateStudent = () => {
        if (editingStudentId === null || newStudentName.trim() === '' || newRegisterId.trim() === '') return;

        setStudents(students.map(student => 
            student.id === editingStudentId ? { ...student, name: newStudentName, registerId: newRegisterId } : student
        ));
        setNewStudentName('');
        setNewRegisterId(''); // Clear Register ID after updating
        setEditingStudentId(null);
        setIsAddingStudent(false); // Hide the input field after updating
    };

    const handleRemoveStudent = (id) => {
        setStudents(students.filter(student => student.id !== id));
    };

    // Enhanced search functionality to filter by name or register ID
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.registerId.toLowerCase().includes(searchTerm.toLowerCase())
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
                            placeholder="Search Students by Name or Register ID" 
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

                {/* Conditional rendering of the input fields */}
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
                            placeholder="Enter Register ID" 
                            className="border rounded-lg p-2 w-full mb-4" 
                            value={newRegisterId}
                            onChange={(e) => setNewRegisterId(e.target.value)}
                        />
                        <div className="flex gap-4 mb-4">
                            <button 
                                className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                                onClick={handleAddStudent}
                            >
                                <FaCheck />
                                Submit
                            </button>
                            {editingStudentId && (
                                <button 
                                    className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                                    onClick={handleUpdateStudent}
                                >
                                    <FaCheck />
                                    Update Student
                                </button>
                            )}
                        </div>
                    </>
                )}

                {/* Add Student button */}
                {!isAddingStudent && (
                    <button 
                        className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        onClick={() => {
                            setIsAddingStudent(true);
                            setNewStudentName('');
                            setNewRegisterId('');
                            setEditingStudentId(null);
                        }}
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
                                    <th className="border border-gray-300 px-4 py-2">Register ID</th>
                                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map(student => (
                                    <tr key={student.id} className="border-b">
                                        <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{student.registerId}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <div className="flex justify-center gap-6">
                                                <button 
                                                    className="text-yellow-500 hover:text-yellow-600 flex items-center gap-1"
                                                    onClick={() => handleEditStudent(student.id)}
                                                >
                                                    <FaEdit />
                                                    Edit
                                                </button>
                                                <button 
                                                    className="text-red-500 hover:text-red-600 flex items-center gap-1"
                                                    onClick={() => handleRemoveStudent(student.id)}
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