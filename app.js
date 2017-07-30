const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const users = require('./routes/users');
const config = require('./config/database');

mongoose.connect(config.database, (err, success) => {
    if(err){
        console.log(err);
    }else{
        console.log("Connected");
    }
    
});

const app = express();
const port = process.env.PORT || 8080;

//Cors
app.use(cors());

//Set static files
app.use(express.static(path.join(__dirname, 'public')));

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//Passport middleweare

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req, res) => {
    res.send("This is the homepage");
})

app.get('*', (req,res) => {
    res.sendfile(path.join(__dirname, 'public/index.html'));
})

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})