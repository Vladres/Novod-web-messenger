import React from 'react'
import "../Sidebar.css";
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { SearchOutlined } from '@material-ui/icons'

import { Avatar, IconButton } from '@material-ui/core';
import SidebarChat from './SidebarChat';

class Sidebar extends React.Component {
    
    render (){
        return  <div className="sidebar">
        <div className="sidebar-header">
            <Avatar src="https://icon-library.com/images/male-avatar-icon/male-avatar-icon-8.jpg" />

            <div className="sidebar-headerRight">
                <IconButton >
                    <DonutLargeIcon />
                </IconButton>
                <IconButton >
                    <ChatIcon />
                </IconButton>
                <IconButton >
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>

        <div className="sidebar-search">
            <div className="sidebar-search-container">
                <SearchOutlined />
                <input type="text" placeholder="Search or start new chat" />
            </div>
        </div>

        <div className="sidebar-chats">
            {this.props.contacts && this.props.contacts.map(contact => {
                return <SidebarChat contact={contact} key={contact._id} />
            })}

        </div>
    </div>
    }
}

export default Sidebar
