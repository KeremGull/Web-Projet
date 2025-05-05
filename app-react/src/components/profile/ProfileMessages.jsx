import { useEffect } from "react"

export default function ProfileMessages({isSelf, id}){
    function pseudo_messages(id){
        return[
            {author:"İlker",date:"23-03-2024", context:"Oruç zorluyor"
          },
          { author:"Melisa", date:"24-05-2024", context:"Kuaför fiyatları"
    }]
    }
    return (
        <div>
            <h1>Messages</h1>
            <div className="MSGS">

            </div>
        </div>
    )   
}