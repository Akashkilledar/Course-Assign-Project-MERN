let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');
let dotenv = require('dotenv')

dotenv.config();

let port = process.env.SERVER_PORT

mongoose.connect(process.env.MONGOOSE_API_KEY)
.then((res)=>{
    console.log("Database Connected Successfully!!!");
}).catch((err)=>{
    console.log("Something Went Wrong!!!", err); 
})

let app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.json({limit : '50mb'}));
app.use(bodyParser.urlencoded({limit : "50mb" , extended : true}));

app.get('/',((req,res)=>{
    res.send("<h1>Welcome to NodeJS!!!</h1>")
}))

app.use('/students' ,require('./routes/studentRoute'));
app.use('/courses',require('./routes/courseRoute'))
app.use('/assignedCourses',require('./routes/assignedCourseRoute'))

app.listen(port ,()=>{
    console.log(`Server running on ${process.env.SERVER_API_KEY + port}`);  
})