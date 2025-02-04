const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://jainil:gNc3x2dMQLuZLKhP@cluster0.1xldk.mongodb.net/Course_App");

const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    purchased_courses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }]
   
})

const adminSchema = new mongoose.Schema({
    username : String,
    password : String,
    
})

const courseSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    imageLink : String,
    
})

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Courses = mongoose.model("Courses", courseSchema);

module.exports = {
    User,
    Admin,
    Courses
}