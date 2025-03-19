import React from "react";
import "./SideBar.css";
export default function SideBar({isSelf,changeContent}) {
  return (
    <div class = "sidebar">
        <div class = "sidebar-links">
            <div class = "sidebar-link">
                <a onClick={()=>{changeContent("profile")}}>Profile</a>
            </div>
            <div class = "sidebar-link">
                <a onClick={()=>{changeContent("messages")}}>Messages</a>
            </div>
            {isSelf ? <div>
                <div class = "sidebar-link">
                <a onClick={()=>{changeContent("friends")}}>Friends</a>
                </div> 
            <div class = "sidebar-link">
            <a onClick={()=>{changeContent("settings")}}>Settings</a>
            </div> 
            </div>: null}
        </div>
    </div>
  );
}