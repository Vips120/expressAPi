const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./routes/user');
app.use(express.json());
const port = process.env.PORT || 4000;
mongoose.connect('mongodb://localhost/userdb', {useNewUrlParser:true})
        .then(() => console.log('connected to db'))
        .catch(err => console.log(`something went wrong ${err.message}`))

        app.listen(port ,() => console.log(`port working on ${port}`));

        app.use('/api/users', user);