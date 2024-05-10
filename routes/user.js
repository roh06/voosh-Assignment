const {Router} = require('express');
const router = Router();
const jwt = require("jsonwebtoken");
const jwtPassword = "12345";
const User = require("../db/index");
const userMiddleware = require('../middleware/user');
const { route } = require('./admin');


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

router.get('/viewprofiles', userMiddleware, async(req, res) => {
    const result = await User.find({role: 'user', isPublic: true});
    res.status(200).json(result);
})

router.put('/update', userMiddleware, async(req, res) => {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, jwtPassword);
    console.log(decodedToken);

    try{
        const user = await User.findOne({email: decodedToken});
        if(!user) {
            return res.status(404).json({msg: "User not found.!!"});
        }
        const {name, email, password, bio, phone, profilePicture} = req.body;

        if(name){
            user.name = name;
        }
        if(email){
            user.email = email;
        }
        if(password){
            user.password = password;
        }
        if(bio){
            user.bio = bio;
        }
        if(phone){
            user.phone = phone;
        }
        if(profilePicture){
            user.profilePicture = profilePicture;
        }

        await user.save();
        res.status(200).json({msg: "User updated Successfully!!"});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.put('/updatePrivacy', userMiddleware, async(req, res) => {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, jwtPassword);
    console.log(decodedToken);
    const userPrivacyUpdate = req.body.isPublic;
    // console.log( "Rohan" +userPrivacyUpdate);
    const user = await User.findOneAndUpdate(
        {email: decodedToken},
        {$set: {isPublic: userPrivacyUpdate}}
    );
    if(!user){
        return res.status(404).json({msg: "User not found"});
    }
    res.status(200).json({msg: `Account status set to ${userPrivacyUpdate}`});
})
module.exports = router;