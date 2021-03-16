import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import { Avatar, IconButton } from "@material-ui/core";
import SidebarChat from "./SidebarChat";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="http://www.cutu-cutu.ro/sites/default/files/node_images/IMG_1818.JPG"/>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon style={{color: "#b1b3b5"}}/>
          </IconButton>
          <IconButton>
            <ChatIcon style={{color: "#b1b3b5"}}/>
          </IconButton>
          <IconButton>
            <MoreVertIcon style={{color: "#b1b3b5"}}/>
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <IconButton>
            <SearchOutlined style={{color: "#b1b3b5"}}/>
          </IconButton>
          <input placeholder="Search or start new chat" type="text"/>
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>
      </div>
    </div>
  );
}

export default Sidebar;
