const {json} = require('express')
const users = require('../Models/userSchema')
//import jwt token
const jwt = require('jsonwebtoken')

//register logic
exports.register=async(req,res)=>{
    console.log('inside register function');

    //object restructuring
    const {username,email,password}=req.body

    //if check the email is already in db-user already registered
    const existingUser=await users.findOne({email})
    try{
        if(existingUser){
            res.status(401).json("User already registered")
        }
        //if check the email is not present in the db-new user data will save to the database
    
        else{
    
            const newUser=await users({
                username,email,password,github:"",link:"",profile:""
            })
            await newUser.save()
            res.status(200).json("User registration successfull")
    
        }
    }
    catch(err){
        res.status(500).json("server error:",+err.message)
    }

    console.log(`${username} ${email} ${password}`);


    // res.status(200).json("register request recevied")
}

//login logic

exports.login=async(req,res)=>{

    //object restructuring
    const {email,password}=req.body
    try{
        const user=await users.findOne({email,password})
        if(user){

            //token generation
            const token=jwt.sign({userId:user._id},"superkey2024")
            console.log(token);
            // res.status(200).json("Login successfull")   
            res.status(200).json({user,token})  //response 

        }
        else{
            res.status(401).json("Invalid login")
        }
    }
    catch(err){
        res.status(500).json("server error:",+err.message)

    }

}