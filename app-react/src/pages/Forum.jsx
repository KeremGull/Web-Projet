import { useState,useEffect} from 'react'
import Messages from '../components/home/Messages'
import NavBar from '../components/NavBar'
import { useAuth } from '../hooks/AuthProvider'
function Forum(){
    const [closed,setClosed]=useState(false)
    return (
        <>
        <NavBar/>
            
        <div>

            <h1>Forum</h1>
                {useAuth().user.role == "admin" ? 
                    <div>
                    <label>Private Forum</label>
                    <input type="checkbox" checked={closed} onChange={()=>setClosed(!closed)}/>
                    </div>
                    : null}
            <Messages closed={closed}/>
        </div>
        </>
    )
}

export default Forum