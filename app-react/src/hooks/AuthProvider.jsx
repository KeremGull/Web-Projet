import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [token, setToken] = useState(Cookies.get('token') || null);
    const [user, setUser] = useState(Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null);

    const login = (data) => {
        Cookies.set('token', data.token, { expires: 1 }); // Token expires in 1 days
        Cookies.set('user', JSON.stringify(data.user), { expires: 1 });
        setToken(data.token);
        setUser(data.user);
        navigate('/');
    };

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        setToken(null);
        setUser(null);
        navigate('/login_register');
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;