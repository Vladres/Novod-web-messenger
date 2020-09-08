import React from 'react'
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';


function SidebarChat() {
    return (
        <div className="sidebar-chat">
            <Avatar />
            <div className="sidebar-chat-info">
                <h2>Room name</h2>
                <p>
                    This is a last message...
                </p>
            </div>
        </div>
    )
}

export default SidebarChat
