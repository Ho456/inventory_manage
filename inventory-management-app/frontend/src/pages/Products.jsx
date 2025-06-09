import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import { fetchProducts } from '../services/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                // Handle paginated response
                if (data.data) {
                    setProducts(data.data);
                } else {
                    setProducts(data);
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    const handleProductAdded = (newProduct) => {
        setProducts(prev => [...prev, newProduct]);
    };

    const handleProductUpdated = (updatedProduct) => {
        setProducts(prev => prev.map(product => 
            product.id === updatedProduct.id ? updatedProduct : product
        ));
    };

    const handleProductDeleted = (deletedProductId) => {
        setProducts(prev => prev.filter(product => product.id !== deletedProductId));
    };

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>Error loading products: {error}</div>;
    }

    return (
        <div>
            <h1>Products</h1>
            <ProductForm onProductAdded={handleProductAdded} />
            <ProductList 
                products={products} 
                onProductUpdated={handleProductUpdated}
                onProductDeleted={handleProductDeleted}
            />
        </div>
    );
};

export default Products;