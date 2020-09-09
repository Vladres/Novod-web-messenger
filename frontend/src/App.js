import React, {useEffect, useState} from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js'
import axios from './axios'

function App() {
  const [messeges,SetMesseges] = useState([])

  useEffect(() => {
    axios.get('/messeges/sync')
      .then((res) => {
          SetMesseges(res.data)
    })
  }, []);

 useEffect(() => {
  const pusher = new Pusher('bf5cef76b093dddf0b91', {
    cluster: 'eu'
  });

  const channel = pusher.subscribe('messeges');
  channel.bind('inserted', function(data) {
    SetMesseges([...messeges,data]);
  });

  return () => {
    channel.unbind_all();
    channel.unsubscribe();
  };
 }, [messeges]);

 console.log(messeges)


  return (
    <div className="App">
      <div className="app-body">
        <Sidebar />

        <Chat messeges={messeges}/>
      </div>
    </div>
  );
}

export default App;
