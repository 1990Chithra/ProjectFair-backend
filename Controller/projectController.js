const projects=require('../Models/projectSchema')

exports.addUserProject=async(req,res)=>{

    console.log("Inside AddUserProject");
    // res.status(200).json("Add user project request")
    // //userid get
    const userId=req.payload
    //get add project details
    const {title,language,github,link,overview}=req.body
    //get an image
     projectImage= req.file.filename
     console.log(projectImage);

    //logic of adding new project
    try{
        const existingProject=await projects.findOne({github})
        if(existingProject)
        {
            res.status(406).json("Project already exist")

        }
        else{
            const newProject=new projects({title,language,github,link,overview,projectImage,userId})
            await newProject.save()
            res.status(200).json(newProject)

        }

    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}
//get userproject
exports.getUserProject=async(req,res)=>{
    const userId=req.payload
    try{
        const userProject=await projects.find({userId})
        console.log(userProject);
        res.status(200).json(userProject)

    }
    catch(err){
        res.status(401).json(err.message)
    }
}
//get all projects
exports.getAllProjects=async(req,res)=>{
    const searchKey=req.query.search
    const query={
        language:{
            $regex:searchKey,
            $options:"i"
        }
    }
    try{
        const AllProjects=await projects.find(query)
        res.status(200).json(AllProjects)
    }
    catch(err){
        res.status(401).json(err.message)
    }
}
// get home project
exports.getHomeProject=async(req,res)=>{
    try{
        const HomeProject=await projects.find().limit(3)
        res.status(200).json(HomeProject)
    }
    catch(err){
        res.status(401).json(err.message)
    }
}
//Edit project details
exports.editProject=async(req,res)=>{

    const {title,language,github,link,overview,projectImage}=req.body;

    const uploadImage = req.file?req.file.filename:projectImage;

    const userId = req.payload

    const {id}= req.params

    try{
        //find the particular project id in mongodb and add the updated project details
        const updateProject=await projects.findByIdAndUpdate({_id:id},{title,language,github,link,overview,projectImage:uploadImage,userId},{new:true})
        //save the updated project
        await updateProject.save()
        res.status(200).json(updateProject)
    }
    catch(err){
        res.status(401).json(err)
    }
}
//Delete project details
exports.deleteProject=async(req,res)=>{
    const {pid}=req.params
    try{
        const deleteData=await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(deleteData)
    }
    catch(err){
        res.status(401).json(err)
    }
}