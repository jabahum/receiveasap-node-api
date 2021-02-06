const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Username cannot be empty"],
        unique : [true,"Username not available"]
    },
    number:{
        type : String,
        required : [true, "Mobile Number  cannot be empty"],
        unique : [true,"Mobile Number not available"]
    },
    email : {
        type : String,
        required : true,
        match :[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Enter a valid email please"],
        unique : true
    },
    role : {
        type : String,
        enum : ["user"], //other roles shall be updated mannually in the db
        default : "user",
        select : "false"
    },
    password : {
        type : String,
        required : ['true', "Please Add a Password"],
        minlength : [6,"Password should be morethan 6 characters"],
        select : false
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date,
    createdAt: {
        type : Date,
        default : Date.now,
    }
});

//encrypt password using bcrypt
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

//sign the JWT and return
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({ id : this._id }, 
        process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRE
    });
}

//match user entered password to hashed password in database
UserSchema.methods.verifyPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


module.exports = mongoose.model("User",UserSchema);