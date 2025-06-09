import React, { useEffect, useState } from 'react';
import { fetchDashboardReports } from '../services/api';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadReports = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchDashboardReports();
                setReports(data.data || data || []);
            } catch (err) {
                setError(err.message || 'Failed to load reports');
                console.error('Error fetching reports:', err);
            } finally {
                setLoading(false);
            }
        };

        loadReports();
    }, []);

    if (loading) {
        return (
            <div className="container">
                <h1>Inventory Reports</h1>
                <p>Loading reports...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <h1>Inventory Reports</h1>
                <div style={{ color: 'red', padding: '1rem', border: '1px solid #dc3545', borderRadius: '4px', backgroundColor: '#f8d7da' }}>
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Inventory Reports</h1>
            {reports.length === 0 ? (
                <p>No reports available.</p>
            ) : (
                <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
                    <table style={{ 
                        width: '100%', 
                        borderCollapse: 'collapse',
                        border: '1px solid #ddd'
                    }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8f9fa' }}>
                                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Report ID</th>
                                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Product Name</th>
                                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Quantity Sold</th>
                                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Total Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map(report => (
                                <tr key={report.id}>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{report.id}</td>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{report.product_name}</td>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{report.quantity_sold}</td>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>${report.total_revenue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Reports;