const { Router } = require('express');
const adminMW = require('../middlewares/admin');
const router = Router();
const { Admin, Courses } = require("../db/index_db");


router.post('/signup', async (req, res) => {
    //admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    try{
        const existingAdmin = await Admin.findOne({username, password});

        if(existingAdmin){
            return res.status(401).json({ msg : "Admin already exists!"})
        }

        const newAdmin = await Admin.create({username, password});

        res.json({ message: "Admin created Succesfully!"});
    }
    catch(err){
         console.error("Error During signup : ", err);
        //  res.status(500).json({msg : "Internal Server Error"})
    }

})

router.post('/courses', adminMW, async (req, res) => {
    // imp courses creation logic

   /*  const courseSchema = new mongoose.Schema({
        title : String,
        description : String,
        price : Number,
        imageLink : String,
        
    }) */

    const { title, description, price, imageLink } = req.body;
    
    try{
        const existingCourse = await Courses.findOne({title});

        if(existingCourse){
            return res.status(401).json({msg: "Course Already Exists!"})
        }

        const newCourse = await Courses.create({
            title,
            description,
            price,
            imageLink
        });

        res.json({
            message : "Course Created Successfully",
            courseID : newCourse._id
        })
    }
    catch(err){
         console.error("Error During signup : ", err);
         res.status(500).json({msg : "Internal Server Error"})
    }




})

router.get('/courses', adminMW, async (req, res) => {
    // imp fetching all courses
    const courses = await Courses.find();
    
    res.json({
        courses
    })
})


module.exports = router;