import {useContext,createContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
const AuthContext = createContext()

function AuthProvider({children}){
    const navigate = useNavigate()
    const [user,setUser]=useState(JSON.parse(localStorage.getItem("user")) || null)
    const [token,setToken]=useState(localStorage.getItem("token") || "")

    const login = (data) => {
        console.log(data)
        localStorage.setItem("token",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        setToken(data.token)
        setUser(data.user)
        navigate("/")
    }
    const logout = () =>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken("")
        setUser(null)
        navigate("/login_register")
        
    }   
    
    return <AuthContext.Provider value={{token,user,login,logout}}> {children} </AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
export default AuthProvider