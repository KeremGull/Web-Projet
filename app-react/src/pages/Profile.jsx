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
    useEffect(()=>{
         //Id database de mi diye bakan bir useEffect yazılacak
    },[id])
    const viewId = useAuth().user.id;
    const [isSelf, setIsSelf] = useState(viewId === id);
    useEffect(()=>{
        setIsSelf(viewId === id);
    },[id, viewId])
    const [content, setContent] = useState("profile");
    function returnContent(content){
        switch(content){
            case "profile":
                return <ProfileInfo isSelf={isSelf} id={id}/>
                break
            case "messages":
                return <ProfileMessages isSelf={isSelf} id={id}/>
                break
            case "friends":
                if (isSelf){
                    return <ProfileFriends id={id}/>
                }
                else{
                    return <h1>You are not authorized</h1>
                }
                break
            case "settings":
                if (isSelf){
                    return <ProfileSettings id={id}/>
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