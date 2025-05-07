import { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { Navigate, Outlet } from 'react-router';
import Cookies from 'js-cookie';

export default function LoggedIn({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = useAuth().token;

    useEffect(() => {
        if (!token) {
            setLoggedIn(false);
            setLoading(false);
        } else {
            fetch('http://localhost:5001/check_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        setLoggedIn(true);
                    } else {
                        Cookies.remove('token');
                        Cookies.remove('user');
                        setLoggedIn(false);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setLoggedIn(false);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return loggedIn ? <Outlet /> : <Navigate to="/login_register" />;
}