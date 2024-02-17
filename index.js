//loads .env file into process.env
//config-Loads .env file contents into process.env by default.
require('dotenv').config()

//import express

const express=require('express')

//import cors

const cors=require('cors')
// const appMiddleware=require('./Middlewares/appMiddleware')
const jwtMiddleware=require('./Middlewares/jwtMiddleware')

const DB=require('./DB/connection')

const router=require('./Router/route')
//create a backend application using express
const pfServer=express()
//use
pfServer.use(cors())
pfServer.use(express.json())
// pfServer.use(appMiddleware)
pfServer.use(router)
pfServer.use('/Uploads',express.static('./Uploads'))//to exports image from server to client
//port creation

const PORT= 4000 || process.env.PORT
//server listen

pfServer.listen(PORT,()=>{
    console.log('listening on the port' +PORT);
})
//http-get resolving to http://localhost:4000-

pfServer.get("/",(req,res)=>{
    res.send(`<h1>Froject fair started</h1>`)
})