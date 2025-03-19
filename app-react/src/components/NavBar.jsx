import React from 'react'
import { useAuth } from '../hooks/AuthProvider';
import "./NavBar.css"
function NavBar(){
    return (
        <div class="navbar">
            <div class="nav-links">
                <a href="/">Home</a>
                <a href={`/profile/${useAuth().user.id}`}>Profil</a>
                {useAuth().user.role == "admin" ? <a href="/admin">Admin</a> : null}
            </div>
                <button onClick={useAuth().logout} >Logout</button>
        </div>
    )
}

export default NavBar