import { useState } from "react";
import Message from "./Message";
function Messages({closed}) {
  const [messages,setMessages]= useState([{ //Mesajlar databaseden çekilecek
    author:"İlker",date:"23-03-2024", context:"Oruç zorluyor", isPrivate:false
  },{ author:"Melisa", date:"24-05-2024", context:"Kuaför fiyatları", isPrivate:true
  },{ author:"Mert",date:"24-07-2024",context:"Sevgilimi ülkeden atıcaklar", isPrivate:true
  },{author:"Kerem",date:"24-09-2024",context:"intihar düşünüyorum", isPrivate:false
  }])
  return (
    <div>
      <h1>Messages</h1>
      <div className="card">
        {messages.map(message => {
          if (closed && message.isPrivate){
            return <Message author={message.author} context={message.context} date={message.date}/>
          }
          if (!closed && !message.isPrivate){
            return <Message author={message.author} context={message.context} date={message.date}/>
          }
          }
        )}
      </div>
    </div>
    
  )
}

export default Messages;