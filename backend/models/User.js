const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email :{
        type : String ,
        required :[true,"Please provide email"],
        unique : true,
    },
    password : {
        type : String,
        required :[true,"Enter a valid password"],
    },
});
module.exports = mongoose.model('user',userSchema);