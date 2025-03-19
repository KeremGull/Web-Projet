import { useEffect } from "react"
import {useAuth} from "../../hooks/AuthProvider"
export default function ProfileInfo({isSelf, id}) {
    const user = null //User bilgilerini çeken bir fonksiyon yazılacak. İsim Soyisim, üyelik tarihi, rolü, doğum tarihi
    // Kaç topic, kaç reply i olduğu 
    return (
        <div>
            <h1>{id}</h1>
            {isSelf ? <h3>Kendi Profiline bakıyorsun</h3> : null}
        </div>
    )

}