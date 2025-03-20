// src/components/AdminDashboard/FeeManagement.jsx
import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave, FaPlus, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { addFeeCategory as addFeeCategoryAPI } from '../../services/api';
import axios from 'axios';

const FeeManagement = () => {
    const [newCategory, setNewCategory] = useState('');
    const [newAmount, setNewAmount] = useState('');
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [feeCategories, setFeeCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch fee categories when component mounts
    useEffect(() => {
        fetchFeeCategories();
    }, []);

    // Log when categories are updated
    useEffect(() => {
        console.log('FeeManagement: Categories updated:', feeCategories);
    }, [feeCategories]);

    const fetchFeeCategories = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/admin/fees', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFeeCategories(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching fee categories:', error);
            setError('Failed to load fee categories. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSendNotification = async (message) => {
        // This is a placeholder. You'll need to implement the actual notification logic
        console.log('Notification sent:', message);
        // If you have a notification API, you can call it here
    };

    const handleAddCategory = async () => {
        if (newCategory.trim() === '' || newAmount.trim() === '') {
            alert('Please enter both category name and amount');
            return;
        }

        try {
            setLoading(true);
            const response = await addFeeCategoryAPI(newCategory, parseFloat(newAmount));
            
            alert(`Fee category '${newCategory}' has been added successfully!`);
            handleSendNotification(`Fee category '${newCategory}' has been added successfully!`);
            
            setFeeCategories([...feeCategories, response.newFee]);
            setNewCategory('');
            setNewAmount('');
            setIsAddingCategory(false);
            setError(null);
        } catch (error) {
            console.error('Error adding fee category:', error);
            setError(`Error adding fee category: ${error.message}`);
            alert(`Error adding fee category: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEditCategory = (id) => {
        const categoryToEdit = feeCategories.find(cat => cat._id === id);
        if (categoryToEdit) {
            setNewCategory(categoryToEdit.category);
            setNewAmount(categoryToEdit.amount.toString());
            setEditingCategoryId(id);
            setIsAddingCategory(true);
        }
    };

    const handleUpdateCategory = async () => {
        if (editingCategoryId === null || newCategory.trim() === '' || newAmount.trim() === '') {
            alert('Please enter both category name and amount');
            return;
        }

        const amount = parseFloat(newAmount);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:5000/admin/fees/${editingCategoryId}`,
                { category: newCategory, amount },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            const updatedCategory = response.data.updatedFee || {
                _id: editingCategoryId,
                category: newCategory,
                amount: amount
            };
            
            setFeeCategories(feeCategories.map(cat => 
                cat._id === editingCategoryId ? updatedCategory : cat
            ));
            
            alert('Fee category updated successfully');
            handleSendNotification(`Fee category '${newCategory}' has been updated successfully!`);
            
            setNewCategory('');
            setNewAmount('');
            setEditingCategoryId(null);
            setIsAddingCategory(false);
            setError(null);
        } catch (error) {
            console.error('Error updating fee category:', error);
            setError(`Error updating fee category: ${error.message}`);
            alert(`Error updating fee category: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveCategory = async (id) => {
        if (!window.confirm('Are you sure you want to remove this fee category?')) {
            return;
        }
        
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            await axios.delete(
                `http://localhost:5000/admin/fees/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            setFeeCategories(feeCategories.filter(cat => cat._id !== id));
            alert('Fee category removed successfully');
            handleSendNotification(`Fee category has been removed successfully!`);
            setError(null);
        } catch (error) {
            console.error('Error removing fee category:', error);
            setError(`Error removing fee category: ${error.message}`);
            alert(`Error removing fee category: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-green-600 text-2xl" />
                    <h2 className="text-xl font-semibold">Fee Management</h2>
                </div>
                <div className="text-gray-600">
                    {feeCategories.length} {feeCategories.length === 1 ? 'Category' : 'Categories'}
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

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
                            disabled={loading}
                        >
                            <FaCheck />
                            {editingCategoryId ? 'Update Category' : 'Add Category'}
                            {loading && ' ...'}
                        </button>
                        <button
                            className="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                            onClick={() => {
                                setNewCategory('');
                                setNewAmount('');
                                setIsAddingCategory(false);
                                setEditingCategoryId(null);
                            }}
                            disabled={loading}
                        >
                            <FaTimes />
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {!isAddingCategory && (
                <button
                    className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    onClick={() => {
                        setIsAddingCategory(true);
                        setNewCategory('');
                        setNewAmount('');
                        setEditingCategoryId(null);
                    }}
                    disabled={loading}
                >
                    <FaPlus />
                    Add Fee Category
                </button>
            )}

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Fee Categories</h3>
                {loading && !isAddingCategory ? (
                    <div className="text-center py-4">Loading fee categories...</div>
                ) : feeCategories.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">No fee categories found. Add your first category!</div>
                ) : (
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
                                        <tr key={category._id} className="border-b">
                                            <td className="border border-gray-300 px-4 py-2">{category.category}</td>
                                            <td className="border border-gray-300 px-4 py-2">₹{category.amount}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <div className="flex justify-center gap-6">
                                                    <button
                                                        className="text-yellow-500 hover:text-yellow-600 flex items-center gap-1"
                                                        onClick={() => handleEditCategory(category._id)}
                                                        disabled={loading}
                                                    >
                                                        <FaEdit />
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="text-red-500 hover:text-red-600 flex items-center gap-1"
                                                        onClick={() => handleRemoveCategory(category._id)}
                                                        disabled={loading}
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
                )}
            </div>
        </div>
    );
};

export default FeeManagement;
