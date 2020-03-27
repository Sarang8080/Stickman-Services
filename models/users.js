var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        unique:1
    },
    username:{
    type: String,
    maxlength:20
    },
    image:{
        type:String
    },
    password:{
        type:String,
        minlength:5
    }
});



UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);