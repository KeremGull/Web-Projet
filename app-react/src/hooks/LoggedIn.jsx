import React from "react";
import { useAuth } from "./AuthProvider";
import { Navigate, Outlet } from "react-router";

export default function LoggedIn({children}){
    return useAuth().token ? <Outlet/> : <Navigate to="/login_register"/>
}