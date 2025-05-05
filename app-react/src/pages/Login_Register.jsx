import { useState,useEffect, use } from "react"
import Login from "../components/Login-Signup/Login"
import Register from "../components/Login-Signup/Register"
import { validateRegister,validateLogin } from "../lib/validate";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate} from "react-router";
import "./Login_Register.css"
export default function Login_Register() {
    const navigate = useNavigate()
    const user = useAuth()

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

    async function handleRegister(e){
        e.preventDefault()

        if (validateRegister(registerForm)){
            const response = await fetch('http://localhost:5001/login_register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ method:"register", name: registerForm.nom+","+ registerForm.prenom, email: registerForm.email, password: registerForm.password, birthdate: registerForm.date_naissance }),
              });
            console.log("response",response)
            if (response.status === 200){
                const data = await response.json()
                console.log("data",data)
            }
            else if (response.status === 409){
                alert("Bu e-posta zaten kayıtlı.")
            }
            else{
                alert("Kayıt işlemi başarısız oldu. Lütfen daha sonra tekrar deneyin.")
            }
        }
    }
    async function handleLogin(e){
        e.preventDefault()
        if (validateLogin(loginForm)){
            const response = await fetch('http://localhost:5001/login_register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ method:"login",email:loginForm.email, password: loginForm.password }),
              });
            if (response.status === 200){
                const data = await response.json()
                console.log("data",data)
                user.login(data)
            }else if (response.status === 401){
                alert("Geçersiz e-posta veya şifre.")
            }
            else{
                alert("Giriş işlemi başarısız oldu. Lütfen daha sonra tekrar deneyin.")
            }
        }
    }
    useEffect(()=>{
        if (user.token){
            navigate("/")
        }
    },[user.token])

    return (
        
        <div class="login-register-container">
            <div class="welcome"><h2>Welcome to Zorbonne</h2></div>
            <div class="login-register-bgcolor">
            </div>
            <div class="login-register">
                <div class="login-register-buttons">
                    <button onClick={()=>setShown("login")}>Login</button>
                    <button onClick={()=>setShown("register")}>Register</button>
                </div>
                <div class="login-register-form">
                {shown==="login" ? <Login form={loginForm} setForm={setLoginForm} handleFunc={handleLogin}/> 
                : <Register form={registerForm} setForm={setRegisterForm} handleFunc={handleRegister} />}
                </div>
            </div>
        </div>
    )
}