const jwt = require("jsonwebtoken");
const jwtPassword = "12345";

function adminMiddleware(req, res, next){
    const token = req.headers.authorization;

    try{
        const decodedToken = jwt.verify(token, jwtPassword);
        if(decodedToken){
            next();
        }
        else{
            req.status(403).json({
                message: "You are not authenticated.!!"
            })
        }
    }
    catch(err){
        res.status(404).send(err);
    }
}

module.exports = adminMiddleware;