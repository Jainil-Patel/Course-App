const { Router } = require('express');
const userMW = require('../middlewares/user');
const router = Router();
const { User, Courses } = require("../db/index_db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");



router.post('/signin', async(req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username,
        password
    })

    

    if(user){
        const token = jwt.sign({
            username
        }, JWT_SECRET);

        res.json({
            token
        })
    }else{
        res.status(401).json({ message : "Incorrect Email and Password"})
    }


})

router.post('/signup', async (req, res) => {
    //user signup logic
    const username = req.body.username;
    const password = req.body.password;

    try{
        const existingUser = await User.findOne({username});

        if(existingUser){
            return res.status(401).json({
                message : "User already exists!"
            });
        }

        const newUser = await User.create({username, password});

        res.json({
            message : "User created Successfully!"
        });

    }
    catch(e){
        console.error("Error Creating User", e);
    }
})

router.get('/courses', async(req, res) => {
    // imp fetching all courses
    const courses = await Courses.find();
    res.json({
        courses
    })

})

router.post('/courses/:courseId',userMW , async (req, res) => {
    // imp courses purchase logic
    const courseID = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username
    },{
        $push : {
            purchased_courses : courseID
        }
    })

    res.json({
        message : "Course Created Successfully!"
    })

})

router.get('/purchasedCourses', userMW,async(req, res) => {
    // implement fetching purchased logic
    const username = req.headers.username;
    const user = await User.findOne({
        username
    });

    const purchasedIds = user.purchased_courses;

    const courses = await Courses.find({
        _id : {
            "$in" : purchasedIds
        }
    });

    res.json({
        courses
    })

})


module.exports = router;