import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const navStyle = {
        backgroundColor: '#343a40',
        padding: '1rem',
        borderRadius: '4px',
        marginBottom: '1rem'
    };

    const ulStyle = {
        listStyle: 'none',
        display: 'flex',
        gap: '2rem',
        margin: 0,
        padding: 0
    };

    const linkStyle = {
        color: '#fff',
        textDecoration: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        transition: 'background-color 0.3s'
    };

    const activeLinkStyle = {
        ...linkStyle,
        backgroundColor: '#007bff'
    };

    return (
        <nav style={navStyle}>
            <ul style={ulStyle}>
                <li>
                    <Link 
                        to="/" 
                        style={location.pathname === '/' ? activeLinkStyle : linkStyle}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/products" 
                        style={location.pathname === '/products' ? activeLinkStyle : linkStyle}
                    >
                        Products
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/reports" 
                        style={location.pathname === '/reports' ? activeLinkStyle : linkStyle}
                    >
                        Reports
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/dashboard" 
                        style={location.pathname === '/dashboard' ? activeLinkStyle : linkStyle}
                    >
                        Dashboard
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;