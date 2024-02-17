//import express

const express=require('express')

const userController=require('../Controller/userController')
const projectController=require('../Controller/projectController')
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const multerConfig=require('../Middlewares/multerMiddleware')

//create a router object of exprees to define routes(path)
const router=new express.Router()

//using router object to define path

//register Api request 
router.post('/register',userController.register)

//login Api request
router.post('/login',userController.login)

//add user project api routes-
// router.post('/project/add',projectController.addUserProject)

// router.post('/project/add',jwtMiddleware,projectController.addUserProject)
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addUserProject)

//get user project api routes-localhost:4000/projects/all-user-projects
router.get('/project/all-user-projects',jwtMiddleware,projectController.getUserProject)
//get user project api routes-localhost:4000/projects/all-projects

router.get('/project/all-projects',jwtMiddleware,projectController.getAllProjects)

//get all projects routes- localhost:400/projects/all-projects
router.get('/project/home-projects',jwtMiddleware,projectController.getHomeProject)

//update project routes- localhost:4000/projects/update-project/7664443222678890
router.put('/project/update-project/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)

//delete project routes-localhost:4000/projects/delete-project/43567668676

router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.deleteProject)

module.exports=router