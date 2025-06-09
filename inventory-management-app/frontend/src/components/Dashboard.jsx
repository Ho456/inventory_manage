import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchCategories } from '../services/api';

const Dashboard = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch products and categories in parallel
                const [productsResponse, categoriesResponse] = await Promise.allSettled([
                    fetchProducts(),
                    fetchCategories()
                ]);

                // Handle products
                if (productsResponse.status === 'fulfilled') {
                    const products = productsResponse.value.data || productsResponse.value;
                    setTotalProducts(Array.isArray(products) ? products.length : 0);
                } else {
                    console.warn('Failed to fetch products:', productsResponse.reason);
                    setTotalProducts(0);
                }

                // Handle categories
                if (categoriesResponse.status === 'fulfilled') {
                    const categories = categoriesResponse.value.data || categoriesResponse.value;
                    setTotalCategories(Array.isArray(categories) ? categories.length : 0);
                } else {
                    console.warn('Failed to fetch categories:', categoriesResponse.reason);
                    setTotalCategories(0);
                }

            } catch (err) {
                console.error('Dashboard error:', err);
                setError('Failed to load dashboard data');
                setTotalProducts(0);
                setTotalCategories(0);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="dashboard">
                <h2>Loading dashboard...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard">
                <h2>Dashboard</h2>
                <p style={{ color: 'red' }}>Error: {error}</p>
                <div className="metrics">
                    <div className="metric">
                        <h3>Total Products</h3>
                        <p>--</p>
                    </div>
                    <div className="metric">
                        <h3>Total Categories</h3>
                        <p>--</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <h2>Inventory Dashboard</h2>
            <div className="metrics" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem',
                marginTop: '1rem'
            }}>
                <div className="metric" style={{
                    padding: '1rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9'
                }}>
                    <h3>Total Products</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>
                        {totalProducts}
                    </p>
                </div>
                <div className="metric" style={{
                    padding: '1rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9'
                }}>
                    <h3>Total Categories</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
                        {totalCategories}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;