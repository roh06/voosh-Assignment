const {Router} = require('express');
const router = Router();
const jwt = require("jsonwebtoken");
const jwtPassword = "12345";
const User = require("../db/index");
const userMiddleware = require('../middleware/user');


router.get("/", (req,res) => {
    res.json("User Router");
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
            role: User.schema.path('role').enumValues[0]
        });
    
        res.status(200).json({
            message: `User created Successfully with ${name}`
        })
    }
    catch(err){
        res.status(404).send(err);
    }
})

router.post('/signin', async(req, res) => {
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

router.get('/myprofile', userMiddleware, async(req, res) => {
    const user = jwt.verify(req.headers.authorization, jwtPassword);
    console.log(user);

    try{
        const findUser = await User.find({
            email: user
        });
        res.status(200).json(findUser);
    }
    catch(err){
        res.status(404).json({
            message: err
        })
    }
    
})
module.exports = router;