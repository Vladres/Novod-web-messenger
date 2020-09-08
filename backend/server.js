// importing
const express = require('express');
const mongoose = require('mongoose');
const Messeges = require('./dbMesseges');
const Pusher = require('pusher');
const cors = require('cors');

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: '1068652',
    key: 'bf5cef76b093dddf0b91',
    secret: 'd292a144b39e29a24ccd',
    cluster: 'eu',
    encrypted: true
});


//middleware
app.use(express.json());
app.use(cors())

//DB config

const conectionUrl = 'mongodb+srv://admin:Vladre$2001@cluster0.6su0a.mongodb.net/novodwebmessenger?retryWrites=true&w=majority'
mongoose.connect(conectionUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.once('open', () => {
    console.log('DB is connected');

    const msgCollection = db.collection('messegecontents')
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change) => {
        if(change.operationType === 'insert'){
            const messegeDetails = change.fullDocument;
            pusher.trigger('messeges' , 'inserted', {
                name:messegeDetails.name,
                messege:messegeDetails.messege,
                timestamp: messegeDetails.timestamp,
                recieved: messegeDetails.recieved
            })
        }
    })
})

//api routes
app.get('/', (req, res) => res.status(200).send('hello world'))

app.post('/api/messeges/new', (req, res) => {
    const dbMessege = req.body;

    Messeges.create(dbMessege, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(`new messege created : \n ${data}`)
        }
    })
})

app.get('/api/messeges/sync', (req, res) => {
    Messeges.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

//listen
app.listen(port, () => console.log(`Listing on localhost: ${port}`))