const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    studentId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    yearOfStudy: {
        type: Number,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true
    },
    feeStatus: {
        type: [{
            semester: Number,
            amount: Number,
            paid: Boolean,
            dueDate: Date,
            paidDate: Date
        }],
        default: []
    }
});

module.exports = mongoose.model('Student', studentSchema);
