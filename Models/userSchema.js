const mogoose=require('mongoose')

const userSchema=new mogoose.Schema({

    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    github:{
        type:String,
    },
    link:{
        type:String,
    },
    profile:{
        type:String,
    }
})

const users=mogoose.model("users",userSchema)
module.exports=users