import React from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js'
import axios from '../axios'
import '../styles/App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { messeges: [], contacts: [] };
    this.pusher = new Pusher('bf5cef76b093dddf0b91', {
      cluster: 'eu'
    });

    this.channel = this.pusher.subscribe('messeges');
    this.channel.bind('inserted', (data) => {
      axios.get(`/messeges/sync/${'Novod'}`)
        .then((res) => {
          this.setState(res.data.messeges)
          this.setState(res.data.contacts)
        })
    })
  }

  componentDidMount() {
    axios.get(`/messeges/sync/${'Novod'}`)
      .then((res) => {
        this.setState({messeges: res.data.messeges})
        this.setState({contacts : res.data.contacts})
      })

    
  }
  

  componentWillUnmount() {
    this.channel.unbind_all();
    this.channel.unsubscribe();
  }

  render() {
    return <div className="app">
      <div className="app-body">
        <Sidebar contacts={this.state.contacts} />

        <Chat messeges={this.state.messeges} contact={this.state.contacts[0]} />
      </div>
    </div>
  }

}

export default App;
