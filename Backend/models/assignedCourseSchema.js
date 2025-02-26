
let mongoose = require('mongoose');

let assignedCourseSchema = new mongoose.Schema({
    studentID : {type : mongoose.Types.ObjectId, ref:"student"},
    courseID : {type : mongoose.Types.ObjectId, ref:"course"}
});

let AssignedCourses = mongoose.model("assingedCourse", assignedCourseSchema);

module.exports= AssignedCourses;