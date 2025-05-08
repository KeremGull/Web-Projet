import { useEffect } from "react"
import {useAuth} from "../../hooks/AuthProvider"
export default function ProfileInfo({isSelf, profile,isReady}) {
    if (!isReady) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    return (
        <div>
            <h1>{`${profile.name.split(",")[1]} ${profile.name.split(",")[0]}`}</h1>
            <h4>{profile.role}</h4>
            <h5>{profile.joinedAt}</h5>
        </div>
    )

}