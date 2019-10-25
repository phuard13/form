// IMPORTS //
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const FolderRoutes = require('./routes/folder');
const RenderRoutes = require('./routes/render');


// EXPRESS SETUP
const app = express();

//Database setup
mongoose.set('useFindAndModify', false);
const URI = "mongodb+srv://phuard:kayode13@cluster0-lbhnz.mongodb.net/vidjot" //You  should change the mongodb url to a new one that you'll be able to access i only used this to test
    // MONGOOSE CONNECTION
mongoose
    .connect(URI, {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(
    session({
        secret: 'thisisajustarandomkeywordforexpression',
        resave: false,
        saveUninitialized: false
    })
);

// VIEW ENGINE SETUP //
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// APPENDING THE PUBLIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// BODY-PARSER SETUP
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);


// Using the routes
app.use('/folder', FolderRoutes);
app.use('/render', RenderRoutes);


const store = new MongoDBStore({
    uri: URI,
    collection: "sessions"
})




app.listen(5000, 'localhost', (err) => {
    console.log('server started');
});