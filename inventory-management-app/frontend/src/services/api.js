import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1'; // Fixed: Added v1 prefix to match backend routes

// Configure axios defaults
axios.defaults.timeout = 10000; // 10 second timeout
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

// Add response interceptor for better error handling
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout');
            error.message = 'Request timeout - please check your connection';
        } else if (error.response) {
            // Server responded with error status
            console.error('API Error:', error.response.status, error.response.data);
            error.message = error.response.data?.message || `Server error: ${error.response.status}`;
        } else if (error.request) {
            // Request made but no response received
            console.error('Network Error:', error.request);
            error.message = 'Network error - please check if the backend server is running';
        }
        return Promise.reject(error);
    }
);

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        // Return empty array as fallback
        return { data: [] };
    }
};

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        // Return empty array as fallback
        return { data: [] };
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await axios.post(`${API_URL}/products`, productData);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw new Error(error.message || 'Failed to create product');
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`${API_URL}/products/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error(error.message || 'Failed to update product');
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error(error.message || 'Failed to delete product');
    }
};

// Stock management functions
export const updateProductStock = async (id, newQuantity) => {
    try {
        const response = await axios.patch(`${API_URL}/products/${id}/stock`, {
            quantity: newQuantity
        });
        return response.data;
    } catch (error) {
        console.error('Error updating product stock:', error);
        throw new Error(error.message || 'Failed to update product stock');
    }
};

export const adjustProductStock = async (id, adjustment) => {
    try {
        const response = await axios.patch(`${API_URL}/products/${id}/stock`, {
            adjustment: adjustment
        });
        return response.data;
    } catch (error) {
        console.error('Error adjusting product stock:', error);
        throw new Error(error.message || 'Failed to adjust product stock');
    }
};

// Additional API functions for dashboard
export const fetchDashboardStats = async () => {
    try {
        const response = await axios.get(`${API_URL}/dashboard/stats`);
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return { totalProducts: 0, totalCategories: 0, lowStockItems: 0 };
    }
};

export const fetchDashboardReports = async () => {
    try {
        const response = await axios.get(`${API_URL}/dashboard/reports`);
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard reports:', error);
        return { data: [] };
    }
};