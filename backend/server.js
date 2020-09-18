// importing
const express = require('express');
const mongoose = require('mongoose');
const models = require('./models/model');
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

    const msgCollection = db.collection('messeges')
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            const messegeDetails = change.fullDocument;
            pusher.trigger('messeges', 'inserted', messegeDetails)
        }
    })
})

//functions
const createUser = (user) => {
    return models.User.findOneAndUpdate(user, user, {
        new: true,
        useFindAndModify: false,
        upsert: true, new: true, runValidators: true
    }).then(docUser => {
        return docUser;
    });
};

const createContact = (userId, contact) => {
    return models.Contact.findOneAndUpdate(contact, contact, {
        new: true,
        useFindAndModify: false,
        upsert: true, new: true, runValidators: true
    }).then(docContact => {
        return models.User.findByIdAndUpdate(
            userId,
            { $addToSet: { contacts: docContact._id } },
            { new: true, useFindAndModify: false }
        );
    });
};

const createMessege = (userId, messege) => {
    return models.Messege.create(messege).then(docMessege => {
        return models.User.findByIdAndUpdate(
            userId,
            { $push: { messeges: docMessege._id } },
            { new: true, useFindAndModify: false }
        );
    });
};



const getUserWithPopulate = (id) => {
    return models.User.findById(id).populate("messeges").populate("contacts");
};


//api routes
app.post('/api/messeges/new', async (req, res) => {
    try {
        let user = await createUser({
            name: req.body.fromName
        });

        user = await createMessege(user._id, req.body);
        user = await createContact(user._id, { name: req.body.fromName });

        await getUserWithPopulate(user._id).then(response => {
            res.status(200).send(response);
        });
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.post('/api/user/new', async (req, res) => {
    try {
        let user = await createUser({
            name: req.body.fromName,
            phone: req.body.phone,
            email:req.body.email
        });

        await getUserWithPopulate(user._id).then(response => {
            res.status(200).send(response);
        });
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.get('/api/messeges/sync/:name', (req, res) => {
    models.User.findOne({ name: req.params.name }, async (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (data)
                await getUserWithPopulate(data._id).then(response => {
                    res.status(200).send(response);
                });
        }
    })
})

//listen
app.listen(port, () => console.log(`Listing on localhost: ${port}`))