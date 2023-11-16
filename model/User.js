const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:async function(value){
                let count = await mongoose.models.User.countDocuments({email:value})
                if(count){
                    return false
                }
                return true
            },
            message:"email already used..."
        }
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["admin","client"],
        required:true,
        set:function(value){
            return value.toLowerCase()
        }
    },
},
{
    timestamps:true
}
);

module.exports = mongoose.model("User",UserSchema)

