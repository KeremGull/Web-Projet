import { useState } from "react";

function Message(props){

    return (
        <div>
        
        <h3>{props.context}</h3>
        <p>Author: {props.author}      Date:{props.date}</p>
        </div>
    );
}

export default Message