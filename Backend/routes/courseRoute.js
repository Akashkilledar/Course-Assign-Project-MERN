
let express = require('express');

let Course = require('../models/courseSchema');

let router= express.Router();

router.post('/', async (req,res)=>{
    try{
        
        let {name, fees,duration, description} = req.body;
        
        let courseAdd = await Course.create({name,fees,duration,description})
        
        res.json({status:"Success" , data: courseAdd})
    }catch(err){
        res.send({status:"Failed", data: "Something went wrong"})
    }
});

router.get('/', async (req,res)=>{
    try{

        let allCourses = await Course.find({});
        res.send({status :"Success", data:allCourses})
    }catch(err){
        res.send({status: "Failed", data:"Something went Wrong",err})
    }
});

router.get('/:id', async (req,res)=>{
    try{

        let courseID= req.params.id;
        // console.log(studentID);
        
        let singleCourse =  await Course.findById(courseID)
        res.send({status: "Success", data:singleCourse})
    }catch(err){
        res.send({status: "Failed", data:"Something went Wrong",err})
    }
})

router.delete('/:id', async (req,res) =>{
    try{
        
        
        let courseID = req.params.id;
        
        let deletedCourse = await Course.findByIdAndDelete(courseID)
        res.send({status: "success", data : deletedCourse})
    }catch(err){
        res.send({status: "Failed", data:"Something went Wrong",err})
    }
    
});
router.put('/:id', async (req,res)=>{
    try{
        
        let courseID = req.params.id;
        let body = req.body
        
        let updatedCourse = await Course.findByIdAndUpdate(courseID, body, {new:true})
        res.send({status: "success", data : updatedCourse})
    }catch(err){
        res.send({status: "Failed", data:"Something went Wrong",err})
    }
})

module.exports = router