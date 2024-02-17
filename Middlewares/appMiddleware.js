const appMiddleware=(req,res,next)=>{
 console.log("Inside the app middlewares");
 next()
}

module.exports=appMiddleware