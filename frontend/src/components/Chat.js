import React from 'react'
import "../Chat.css"
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert } from '@material-ui/icons';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from '../axios';

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = { input: '' };
        this.sendMessage = this.sendMessage.bind(this);
    }

    async sendMessage(e) {
        e.preventDefault();
        await axios.post('/messeges/new', {
            messege: this.state.input,	
            fromName: "Novod",
            toName: "TestName",
            recieved: true
        }).catch((err) => {
            console.log(err)
        })

        this.setState({input : ''});
    }


    render() {
        return <div className="chat">

            <div className="chat-header">
                <Avatar />

                <div className="header-info">
                    {this.props.contact ? <div><h3>{this.props.contact.name}</h3><p>{this.props.contact.phone}</p></div> : null}
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
                {this.props.messeges && this.props.messeges.map((messege) => {
                    return <p className={`chat-message ${messege.recieved && "chat-reciever"}`} key={messege._id}>
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
                        value={this.state.input}
                        onChange={(e) => this.setState({input : e.target.value})}
                        placeholder="Type a message..."
                        type="text"
                    />

                    <button type="submit" onClick={this.sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    }
}

export default Chat
