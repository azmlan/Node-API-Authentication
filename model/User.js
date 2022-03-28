const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String ,
        required:true,
        min:3,
        max:100,
    },
    email:{
        type:String ,
        required:true,
        min:6,
        max:100,
    },
    password:{
        type:String ,
        required:true,
        min:6,
        max:1024,
    },
    date:{
        type:Date,
        default:Date.now,
    }
});

const User = mongoose.model('User',userSchema);
module.exports= User