const {Router} = require('express');
const router = Router();
const jwt = require("jsonwebtoken");
const jwtPassword = "12345";
const User = require("../db/index");
const adminMiddleware = require('../middleware/admin');


router.get("/", (req,res) => {
    res.json("Admin Router");
});

router.post("/signup", async (req,res) => {
    console.log(req.body);
    const {name, email, password, bio, phone, profilePicture, isPublic} = req.body;

    try {
        await User.create({
            name: name,
            email: email,
            password: password,
            bio: bio,
            phone: phone,
            profilePicture: profilePicture,
            isPublic: isPublic,
            role: User.schema.path('role').enumValues[1]
        });
        // console.log(User.schema.path('role').enumValues[1])
    
        res.status(200).json({
            message: `Admin created Successfully with ${name}`
        })
    }
    catch(err){
        res.status(404).send(err);
    }
});

router.post("/signin", async(req, res) => {
    const {email, password} = req.body;
    const user = await User.find({
        email: email,
        password: password
    })
    if(user){
        const token = jwt.sign(email, jwtPassword);
        res.status(200).json(token);
    }
    else{
        res.status(404).json({
            message: "Incorrect email or password.!!"
        })
    }
});

router.get("/accessProfiles", adminMiddleware, async (req, res) => {
    const result = await User.find({role: 'user'});
    res.json(result);
})

module.exports = router;