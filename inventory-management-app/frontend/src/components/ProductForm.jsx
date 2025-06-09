import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct, fetchCategories } from '../services/api';

const ProductForm = ({ product, onProductAdded, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        sku: '',
        price: '',
        quantity: '',
        category_id: '',
        supplier: '',
        reorder_level: '',
        status: 'active'
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Load categories when component mounts
        loadCategories();
        
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                sku: product.sku || '',
                price: product.price || '',
                quantity: product.quantity || '',
                category_id: product.category_id || '',
                supplier: product.supplier || '',
                reorder_level: product.reorder_level || '',
                status: product.status || 'active'
            });
            setIsEditing(true);
        }
    }, [product]);

    const loadCategories = async () => {
        try {
            const data = await fetchCategories();
            setCategories(data);
        } catch (err) {
            console.error('Error loading categories:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity),
                reorder_level: parseInt(formData.reorder_level),
                category_id: parseInt(formData.category_id)
            };

            let result;
            if (isEditing && product) {
                result = await updateProduct(product.id, productData);
            } else {
                result = await createProduct(productData);
                if (onProductAdded) {
                    onProductAdded(result);
                }
            }

            if (onSave) {
                onSave(result);
            }

            resetForm();
        } catch (err) {
            setError(err.message || 'Failed to save product');
            console.error('Error saving product:', err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            sku: '',
            price: '',
            quantity: '',
            category_id: '',
            supplier: '',
            reorder_level: '',
            status: 'active'
        });
        setIsEditing(false);
        setError(null);
    };

    return (
        <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
            
            {error && (
                <div style={{ color: 'red', marginBottom: '1rem' }}>
                    Error: {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', maxWidth: '500px' }}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <div>
                    <label>SKU:</label>
                    <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="0"
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <div>
                    <label>Category:</label>
                    <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Supplier:</label>
                    <input
                        type="text"
                        name="supplier"
                        value={formData.supplier}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <div>
                    <label>Reorder Level:</label>
                    <input
                        type="number"
                        name="reorder_level"
                        value={formData.reorder_level}
                        onChange={handleChange}
                        min="0"
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <div>
                    <label>Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Saving...' : (isEditing ? 'Update Product' : 'Add Product')}
                    </button>
                    
                    {isEditing && (
                        <button 
                            type="button" 
                            onClick={resetForm}
                            style={{
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProductForm;