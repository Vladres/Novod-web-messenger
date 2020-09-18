import React from 'react'
import '../SidebarChat.css';
import { Avatar } from '@material-ui/core';


class SidebarChat extends React.Component {
    render(){
       return <div className="sidebar-chat">
            <Avatar />
            <div className="sidebar-chat-info">
                <h2>{this.props.contact.name}</h2>
                <p>
                    {this.props.contact.phone}
                </p>
            </div>
        </div>
    }
}

export default SidebarChat
