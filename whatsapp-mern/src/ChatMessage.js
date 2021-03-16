import React from "react";
import "./ChatMessage.css"

function ChatMessage({name, message, timestamp, received=false}) {
  return (
    <p className={received ? "chat__received" : "chat__sent"}>
      <span className="chat__name">{name}</span>
        {message}
        <span className="chat__timestamp">{timestamp == null ? new Date().toUTCString() : timestamp}</span>
    </p>
  );
}

export default ChatMessage;
