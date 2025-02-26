let mongoose = require('mongoose')

let courseSchema = new mongoose.Schema({
    name : {type:String , required:true},
    fees : {type :String, required : true},
    duration:{type:String, required:true},
    description : {type: String, required:true},
    // assignedTo : {type : mongoose.Types.ObjectId, ref:"student"}
})

module.exports = mongoose.model("course", courseSchema);

