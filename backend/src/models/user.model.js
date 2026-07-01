import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username:{
        type:String,
        unique: true,
        required:true,
        maxlength:[20,"username cannot exceed 20 characters "],
        minlength:[3,"Username must be at least 3 characters long"],
        trim:true,
        match:[/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address'
    ]
    },
    password:{
        type:String,
        required:true
    },
    about:{
         type:String,
         maxlength:[100,"describe yourself under 100 words"],
    },
    avatar:{
        type:String,
        default:''
    },
    refreshToken:{
        type:String
    }
})


userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect =async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username
        },
        process.env.JWT_ACCESS_TOKEN,
        {
            expiresIn:process.env.JWT_ACCESS_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.JWT_REFRESH_TOKEN,
        {
            expiresIn:process.env.JWT_REFRESH_EXPIRY
        }
    )
}



export const User = mongoose.model("User",userSchema);

