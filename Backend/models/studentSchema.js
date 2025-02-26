
let mongoose = require('mongoose');

let studentSchema = new mongoose.Schema({
    name : {type :String, required:true},
    surname : {type:String, required:true},
    email : {type:String, required:true , unique:true},
    qualification : {type: String, required:true},
    mobile : {type:Number, required:true}
});

let Students = mongoose.model("student" ,studentSchema);

module.exports = Students;