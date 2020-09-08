import React from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert } from '@material-ui/icons';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";

function Chat() {
    return (
        <div className="chat">

            <div className="chat-header">
                <Avatar />

                <div className="header-info">
                    <h3>Room name</h3>
                    <p>Latest seen at ...</p>
                </div>

                <div className="chat-headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat-body">
                <p className="chat-message">
                    <span className="chat-name">Vlad</span>
                    This is a message
                    <span className="chat-timestamp">
                        {new Date().toISOString()}
                    </span>
                </p>
                <p className="chat-message chat-reciever">
                    <span className="chat-name">Vlad</span>
                    This is a message
                    <span className="chat-timestamp">
                        {new Date().toISOString()}
                    </span>
                </p>
            </div>

            <div className="chat-footer">
                <InsertEmoticonIcon />
                <form>
                    <input 
                    // value={input}
                    // onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    type="text"
                    />

                    <button type="submit" 
                    // onClick={sendMessage}
                    >
                        Send a message
                    </button>
                </form>
                <MicIcon />
            </div>

        </div>
    )
}

export default Chat
