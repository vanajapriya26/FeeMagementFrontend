// src/components/AdminDashboard/FeeManagement.js

import React, { useState } from 'react';
import { FaMoneyBillWave, FaPlus, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

const FeeManagement = () => {
    const [feeCategories, setFeeCategories] = useState([
        { id: 1, name: 'Tuition Fee', amount: 50000 },
        { id: 2, name: 'Library Fee', amount: 2000 },
        { id: 3, name: 'Sports Fee', amount: 1500 }
    ]);
    const [newCategory, setNewCategory] = useState('');
    const [newAmount, setNewAmount] = useState('');
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);

    const handleAddCategory = () => {
        if (newCategory.trim() === '' || newAmount.trim() === '') {
            alert('Please enter both category name and amount');
            return;
        }

        const amount = parseFloat(newAmount);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        const newFeeCategory = {
            id: feeCategories.length + 1,
            name: newCategory,
            amount: amount
        };

        setFeeCategories([...feeCategories, newFeeCategory]);
        setNewCategory('');
        setNewAmount('');
        setIsAddingCategory(false);
    };

    const handleEditCategory = (id) => {
        const categoryToEdit = feeCategories.find(cat => cat.id === id);
        setNewCategory(categoryToEdit.name);
        setNewAmount(categoryToEdit.amount.toString());
        setEditingCategoryId(id);
        setIsAddingCategory(true);
    };

    const handleUpdateCategory = () => {
        if (editingCategoryId === null || newCategory.trim() === '' || newAmount.trim() === '') return;

        const amount = parseFloat(newAmount);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        setFeeCategories(feeCategories.map(category =>
            category.id === editingCategoryId 
                ? { ...category, name: newCategory, amount: amount }
                : category
        ));
        setNewCategory('');
        setNewAmount('');
        setEditingCategoryId(null);
        setIsAddingCategory(false);
    };

    const handleRemoveCategory = (id) => {
        if (window.confirm('Are you sure you want to remove this fee category?')) {
            setFeeCategories(feeCategories.filter(category => category.id !== id));
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center gap-2 mb-6">
                <FaMoneyBillWave className="text-green-600 text-2xl" />
                <h2 className="text-xl font-semibold">Fee Management</h2>
            </div>

            {/* Input fields for new category */}
            {isAddingCategory && (
                <div className="mt-4 space-y-4">
                    <input
                        type="text"
                        placeholder="Enter Fee Category Name"
                        className="border rounded-lg p-2 w-full"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Enter Amount"
                        className="border rounded-lg p-2 w-full"
                        value={newAmount}
                        onChange={(e) => setNewAmount(e.target.value)}
                    />
                    <div className="flex gap-4">
                        <button
                            className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                            onClick={editingCategoryId ? handleUpdateCategory : handleAddCategory}
                        >
                            <FaCheck />
                            {editingCategoryId ? 'Update Category' : 'Add Category'}
                        </button>
                    </div>
                </div>
            )}

            {/* Add Category button */}
            {!isAddingCategory && (
                <button
                    className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    onClick={() => {
                        setIsAddingCategory(true);
                        setNewCategory('');
                        setNewAmount('');
                        setEditingCategoryId(null);
                    }}
                >
                    <FaPlus />
                    Add Fee Category
                </button>
            )}

            {/* Fee Categories Table */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Fee Categories</h3>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">Category Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Amount (₹)</th>
                                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feeCategories.map(category => (
                                    <tr key={category.id} className="border-b">
                                        <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">₹{category.amount}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <div className="flex justify-center gap-6">
                                                <button
                                                    className="text-yellow-500 hover:text-yellow-600 flex items-center gap-1"
                                                    onClick={() => handleEditCategory(category.id)}
                                                >
                                                    <FaEdit />
                                                    Edit
                                                </button>
                                                <button
                                                    className="text-red-500 hover:text-red-600 flex items-center gap-1"
                                                    onClick={() => handleRemoveCategory(category.id)}
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

export default FeeManagement;