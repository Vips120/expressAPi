let mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    Email: {type:String,required:true},
    Password:{type:String,required:true}
});

let Users = mongoose.model('users', usersSchema);

module.exports = Users;