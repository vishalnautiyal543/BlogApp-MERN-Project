import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    blog:{
        type:Schema.Types.ObjectId,
        ref:"Blog",
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    }
},
{timestamps:true}
)


export const Comment = mongoose.model("Comment",commentSchema)
