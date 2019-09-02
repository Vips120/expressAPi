const express = require('express');
const app = express();
app.use(express.json());

let users = [{
    id:1,
    name:'John Doe'
},{
    id:2,
    name:'Emma'
},
{
    id:3,
    name:'johnny Bravo'
},
 {
     id:4,
     name:'Rocky'
 }
];
//connection
app.listen(4000, () => console.log(`port is working on 4000`));

//using get
app.get('/api/users',(req,res) => {
    // res.send('hello user');
    res.send(users);
});

// get user by id
app.get('/api/user/:id',(req,res) => {
    let userId = users.find(data => data.id === parseInt(req.params.id));
    if(!userId) {return res.status(402).send('invalid id')}
    res.send(userId);
});

//create a new user
app.post('/api/user/newuser', (req,res) => {
    let newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
   res.send(users);   
});

//update user
app.put('/api/user/:id',(req,res) => {
    let user = users.find(data => data.id === parseInt(req.params.id));
    if(!user) {return res.status(402).send('invalid id')}
    user.name = req.body.name;
    res.send(users);
});

//delete user
app.delete('/api/user/:id', (req,res) => {
    let user = users.find(data => data.id === parseInt(req.params.id));
    if(!user) {return res.status(402).send('invalid id')}
    let index = users.indexOf(user);
    let item = users.splice(index);
    res.send('remove the data');
})