import React, { useState } from 'react';
import { deleteProduct, adjustProductStock } from '../services/api';

const ProductList = ({ products, onProductUpdated, onProductDeleted }) => {
    const [loadingStates, setLoadingStates] = useState({});

    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId);
            if (onProductDeleted) {
                onProductDeleted(productId);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    const handleStockAdjustment = async (productId, adjustment) => {
        try {
            setLoadingStates(prev => ({ ...prev, [productId]: true }));
            
            const updatedProduct = await adjustProductStock(productId, adjustment);
            
            if (onProductUpdated) {
                onProductUpdated(updatedProduct);
            }
        } catch (error) {
            console.error('Error adjusting stock:', error);
            alert('Failed to update stock: ' + error.message);
        } finally {
            setLoadingStates(prev => ({ ...prev, [productId]: false }));
        }
    };

    const isLoading = (productId) => loadingStates[productId] || false;

    if (!products || products.length === 0) {
        return (
            <div>
                <h2>Product List</h2>
                <p>No products found.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Product List</h2>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                {products.map(product => (
                    <div key={product.id} style={{ 
                        border: '1px solid #ddd', 
                        padding: '1rem', 
                        borderRadius: '4px',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <h3>{product.name}</h3>
                        <p><strong>SKU:</strong> {product.sku}</p>
                        <p><strong>Price:</strong> ${product.price}</p>
                        
                        {/* Quantity with adjustment buttons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <strong>Quantity:</strong>
                            <button 
                                onClick={() => handleStockAdjustment(product.id, -1)}
                                disabled={isLoading(product.id) || product.quantity <= 0}
                                style={{
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '4px',
                                    cursor: (isLoading(product.id) || product.quantity <= 0) ? 'not-allowed' : 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    opacity: (isLoading(product.id) || product.quantity <= 0) ? 0.6 : 1
                                }}
                                title="Decrease quantity by 1"
                            >
                                −
                            </button>
                            
                            <span style={{ 
                                minWidth: '40px', 
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: '16px'
                            }}>
                                {product.quantity}
                            </span>
                            
                            <button 
                                onClick={() => handleStockAdjustment(product.id, 1)}
                                disabled={isLoading(product.id)}
                                style={{
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '4px',
                                    cursor: isLoading(product.id) ? 'not-allowed' : 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    opacity: isLoading(product.id) ? 0.6 : 1
                                }}
                                title="Increase quantity by 1"
                            >
                                +
                            </button>
                            
                            {isLoading(product.id) && (
                                <span style={{ fontSize: '12px', color: '#6c757d' }}>
                                    Updating...
                                </span>
                            )}
                        </div>
                        
                        <p><strong>Category:</strong> {product.category?.name || 'N/A'}</p>
                        <p><strong>Status:</strong> {product.status}</p>
                        {product.description && <p><strong>Description:</strong> {product.description}</p>}
                        {product.quantity <= product.reorder_level && (
                            <p style={{ color: 'red', fontWeight: 'bold' }}>⚠️ Low Stock Alert!</p>
                        )}
                        <div style={{ marginTop: '0.5rem' }}>
                            <button 
                                onClick={() => handleDelete(product.id)}
                                style={{
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;