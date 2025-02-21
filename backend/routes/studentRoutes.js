const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get student by ID
router.get('/:studentId', async (req, res) => {
    try {
        const student = await Student.findOne({ studentId: req.params.studentId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login student
router.post('/login', async (req, res) => {
    try {
        const { studentId } = req.body;
        console.log('Login attempt with ID:', studentId);
        
        const student = await Student.findOne({ studentId });
        console.log('Found student:', student);
        
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add initial student data
router.post('/init', async (req, res) => {
    try {
        const students = [
            {
                name: 'Akhilesh',
                studentId: '21A21A05D3',
                email: 'akh@gmail.com',
                department: 'CSE',
                yearOfStudy: 4,
                semester: 8,
                contactNumber: '9986636322'
            },
            {
                name: 'K Dedeepya',
                studentId: '21A21A05D4',
                email: 'dedeepya@gmail.com',
                department: 'CSE',
                yearOfStudy: 4,
                semester: 8,
                contactNumber: '8536727326'
            },
            {
                name: 'T Lahari',
                studentId: '21A21A05D5',
                email: 'lahari@gmail.com',
                department: 'CSE',
                yearOfStudy: 4,
                semester: 8,
                contactNumber: '9355252662'
            },
            {
                name: 'P Ramu',
                studentId: '21A21A05D6',
                email: 'Ramu@gmail.com',
                department: 'CSE',
                yearOfStudy: 4,
                semester: 8,
                contactNumber: '8363637377'
            },
            {
                name: 'P Sowmya',
                studentId: '21A21A05D7',
                email: 'Sowmya@gmail.com',
                department: 'CSE',
                yearOfStudy: 4,
                semester: 8,
                contactNumber: '8363635552'
            },
            {
                name: 'P Eswari',
                studentId: '21A21A05D8',
                email: 'Eswari@gmail.com',
                department: 'CSE',
                yearOfStudy: 4,
                semester: 8,
                contactNumber: '8363938373'
            },
            {
                name: 'P Mohan Kumar',
                studentId: '21A21A05D9',
                email: 'Mohankumar@gmail.com',
                department: 'CSE',
                yearOfStudy: 4,
                semester: 8,
                contactNumber: '9663535252'
            }
        ];

        await Student.insertMany(students);
        res.status(201).json({ message: 'Initial student data added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
