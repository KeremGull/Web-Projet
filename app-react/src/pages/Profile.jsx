import { useEffect,useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/profile/SideBar";
import { useParams } from "react-router";
import { useAuth } from "../hooks/AuthProvider";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileFriends from "../components/profile/ProfileFriends";
import ProfileMessages from "../components/profile/ProfileMessages";
import ProfileSettings from "../components/profile/ProfileSettings";

export default function Profile() {
    const { id } = useParams();
    const token = useAuth().token;
    useEffect(()=>{
         //Id database de mi diye bakan bir useEffect yazılacak
        async function fetchProfile() {
            try {
                const response = await fetch('http://localhost:5001/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Token ekleniyor
                    },
                    body: JSON.stringify({ id: id }),
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setProfileData(data.profile); 
                    setIsSelf(data.isSelf); 
                    
                } else {
                    console.error("Profil bilgisi alınamadı:", response.status);
                }
            } catch (error) {
                console.error("Sunucu hatası:", error);
            }
        }
        fetchProfile();

    }, [id, token]);
    const [isSelf, setIsSelf] = useState(false);
    const [content, setContent] = useState("profile");
    const [profileData, setProfileData] = useState(null);

    function returnContent(content){
        switch(content){
            case "profile":
                return <ProfileInfo isSelf={isSelf} profile={profileData} isReady={profileData != null}/>
                break
            case "messages":
                return <ProfileMessages isSelf={isSelf} profile={profileData} isReady={profileData != null}/>
                break
            case "friends":
                if (isSelf){
                    return <ProfileFriends profile={profileData} isReady={profileData != null} />
                }
                else{
                    return <h1>You are not authorized</h1>
                }
                break
            case "settings":
                if (isSelf){
                    return <ProfileSettings profile={profileData} isReady={profileData != null}/>
                }
                else{
                    return <h1>You are not authorized</h1>
                }
                break
            default:
                return <h1>Error </h1>
        }
    }

    return (
        <div>
            <NavBar/>
            <div>
                <SideBar isSelf={isSelf} changeContent={setContent}/>
                <div class="profile-container">
                    {returnContent(content)}
                </div>
            </div>  
            

        </div>
    );
}