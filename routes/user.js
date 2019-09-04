const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const Users = require('../dbSchema/users');

//get all users
router.get('/allusers' , async (req,res) => {
    let data = await Users.find();
 res.send(data);
});

// create new user

router.post('/newuser',async (req,res) => {
    let {error} = ValidationError(req.body);
    if(error){return res.status(403).send(error.details[0].message)}
let data = new Users({
    firstname: req.body.firstname,
    lastname:req.body.lastname,
    Email:req.body.Email,
    Password:req.body.Password
});

let item = await data.save();
res.send(item);
});

// update user
router.put('/user/:id',async (req,res) => {
let user = await Users.findById(req.params.id);
if(!user){return res.status(403).send('invalid user id')}
let {error} = ValidationError(req.body);
if(error){return res.status(403).send(error.details[0].message)}
user.firstname = req.body.firstname;
user.lastname = req.body.lastname;
user.Email = req.body.Email;
user.Password = req.body.Password;
res.send(user);
});

//delete user

router.delete('/user/:id', (req,res) => {
    let user = Users.findByIdAndRemove(req.params.id);
    if(!user){return res.status(403).send('invalid user id')}
    res.send({message: 'remove the data'})
});


function ValidationError(message){
    let Schema = Joi.object().keys({
        'firstname': Joi.string().min(5).max(50).required(),
        'lastname': Joi.string().min(5).max(50).required(),
        'Email': Joi.string().required(),
        'Password':Joi.string().required()
    })
    return Joi.validate(message,Schema);
}

module.exports = router;