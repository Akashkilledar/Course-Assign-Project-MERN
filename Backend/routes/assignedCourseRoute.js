let express = require('express')

let AssignedCourse = require('../models/assignedCourseSchema')

let router = express.Router();

router.post('/', async (req,res)=>{
    try{

        let {studentID, courseID} = req.body;
        
        let assignedTo = await AssignedCourse.create({studentID,courseID})
        
        res.json({status:"success", data: assignedTo})
    }catch(err){
        res.send({status : "Failed", data: "Something went Wrong",err})
    }
});

router.get('/', async (req,res)=>{
    try{

        let allAssignedCourseDetails = await AssignedCourse.find({});
        res.send({status: "Success", data:allAssignedCourseDetails})
    }catch(err){
        res.send({status : "Failed", data: "Something went Wrong",err})
    }
})

router.get('/:id', async (req, res) => {
    try {
        let studentID = req.params.id;
        let assignedCourseData = await AssignedCourse.find({ studentID })
            // .populate("studentID")
            .populate("courseID");

        res.send({ status: "Success", data: assignedCourseData });
    } catch (err) {
        res.send({ status: "Failed", data: "Something went wrong", err });
    }
});



module.exports = router;