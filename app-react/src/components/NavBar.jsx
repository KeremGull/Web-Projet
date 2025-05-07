import React from 'react'
import { useAuth } from '../hooks/AuthProvider';
import "./NavBar.css"
function NavBar(){
    return (
        <div class="navbar">
            <div class="nav-links">
                <a href="/">Home</a>
                <a href={`/profile/${useAuth().user.id}`}>Profil</a>
            
            </div>
                <button onClick={useAuth().logout} >Logout</button>
        </div>
    )
}

export default NavBar