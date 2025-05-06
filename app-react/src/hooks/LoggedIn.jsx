import React, { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate, Outlet } from "react-router";

export default function LoggedIn({children}){
    const [loggedIn, setLoggedIn] = React.useState(false)
    const token = useAuth().token
    useEffect(() => {
        const checkToken = async () => {
            if (token){
                const response = await fetch('http://localhost:5001/check_token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`}
                }).then(res => res.json())
                if (response.message === "Token geçerli"){
                    console.log(response)
                    setLoggedIn(true)
                }else{
                    setLoggedIn(false)
                }
            }
        }
        checkToken()
    },[token])
    return useAuth().token ? <Outlet/> : <Navigate to="/login_register"/>
}