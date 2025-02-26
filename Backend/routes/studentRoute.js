let express = require('express')

let Students = require('../models/studentSchema');

let router = express.Router();

router.get('/' ,async (req, res)=>{
    try{
        let AllStudents = await Students.find({})
        res.send({status : "Success", data : AllStudents})
    }catch(err){
        res.send({status : "Failed", data:"Something Went wrong",err})
    }
});

router.get('/:id', async (req,res)=>{
    try{
       let studentID = req.params.id
        let singleStudent = await Students.findById(studentID)
        res.send({status : "Success" , data : singleStudent})
    }catch(err){
        res.send({status : "Failed", data: "Something went wrong"})

    }
});

router.post('/', async (req,res)=>{
    try{
        
        let body = req.body;
        
        let singleStudent = await Students.create({
            name : body.name,
            surname : body.surname,
            email : body.email,
            qualification : body.qualification,
            mobile : body.mobile
        })
        // console.log(singleStudent);
        res.send({status : "Success" , data : singleStudent})
    }catch(err){
        
        res.send({status : "Failed", data: "Something went wrong",err})
    }
    
});

router.put('/:id', async (req,res)=>{
    try{

        // console.log(req.params.id);
        let studentID = req.params.id;
        body = req.body
        let updatedStudent = await Students.findByIdAndUpdate(studentID, body , {new :true})
        
        //  console.log(updatedStudent);
        res.send({status:"Successs" , data : updatedStudent})
    }catch(err){
        res.send({status : "Failed", data: "Something went wrong"})
    }
    });

    router.delete('/:id', async (req,res)=>{
        try{

            let studentID = req.params.id;
            let deletedStudent = await Students.findByIdAndDelete(studentID)
            res.send({status : "Success", data: deletedStudent})
        }catch(err){
            res.send({status: "Failed", data: "Something Went Wrong"})
        }
    });

module.exports = router