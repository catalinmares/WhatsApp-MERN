import React, { useState } from "react";
import "./Chat.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { Avatar, IconButton } from "@material-ui/core";
import ChatMessage from "./ChatMessage";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";

function Chat({ messages }) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message: input,
      name: "Catalin",
      timestamp: new Date().toUTCString(),
      received: false,
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3 style={{ color: "#dddddf" }}>Room name</h3>
          <p style={{ color: "#a7a9ab" }}>Last seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined style={{ color: "#b1b3b5" }} />
          </IconButton>
          <IconButton>
            <MoreVertIcon style={{ color: "#b1b3b5" }} />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <ChatMessage
            name={message.name}
            message={message.message}
            timestamp={message.timestamp}
            received={message.received}
          />
        ))}
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticonIcon style={{ color: "#828689" }} />
        </IconButton>
        <IconButton>
          <AttachFileIcon style={{ color: "#828689" }} />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <IconButton>
          <MicIcon style={{ color: "#828689" }} />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
