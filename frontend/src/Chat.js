import React, { useState } from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert } from '@material-ui/icons';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from './axios'

function Chat({ messeges }) {

    const [input, setInput] = useState('');
    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post('/messeges/new', {
            messege: input,
            name: "Novod",
            timestamp: "JUST now",
            recieved: true
        }).catch((err)=>{
            console.log(err)
        })

        setInput('');
    }

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
                {messeges.map((messege) => {
                    return <p className={`chat-message ${messege.recieved && "chat-reciever"}`}>
                        <span className="chat-name">{messege.name}</span>
                        {messege.messege}
                        <span className="chat-timestamp">
                            {messege.timestamp}
                        </span>
                    </p>
                })}
            </div>

            <div className="chat-footer">
                <InsertEmoticonIcon />
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        type="text"
                    />

                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>

        </div>
    )
}

export default Chat
