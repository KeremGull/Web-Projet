import { useState,useEffect, use } from "react"
import Login from "../components/Login-Signup/Login"
import Register from "../components/Login-Signup/Register"
import { validateRegister,validateLogin } from "../lib/validate";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate} from "react-router";
export default function Login_Register() {
    const navigate = useNavigate()
    const user = useAuth()
    const user_pseudo = {
        token:1,
        user:{
            id:"2",
            role:"admin",
            nom:"Gul",
            prenom:"Kerem",
        }
    }

    const [shown,setShown]=useState("login");
    const [registerForm,setRegisterForm]=useState({
        nom:"",
        prenom:"",
        date_naissance:"",
        email:"",
        password:"",
        password2:""
    })
    const [loginForm,setLoginForm]=useState({
        email:"",
        password:""
    })

    function handleRegister(){
        if (validateRegister(registerForm)){

        }
    }
    function handleLogin(){
        if (validateLogin(loginForm)){
            // giriş bilgileri servera gönderilecek ve token alınacak
            // token ile birlikte kullanıcı bilgileri autherizationa gönderilecek
            user.login(user_pseudo)
        }
    }
    useEffect(()=>{
        if (user.token){
            navigate("/")
        }
    },[user.token])

    return (
        
        <div>
            <div>
            <button onClick={()=>setShown("login")}>Login</button>
            <button onClick={()=>setShown("register")}>Register</button>
            </div>
            {shown==="login" ? <Login form={loginForm} setForm={setLoginForm} handleFunc={handleLogin}/> 
            : <Register form={registerForm} setForm={setRegisterForm} handleFunc={handleRegister}/>}
        </div>
    )
}