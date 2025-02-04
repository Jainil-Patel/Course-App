const { User } = require("../db/index_db");
const { JWT_SECRET } =require("../config");
const jwt = require("jsonwebtoken");

function userMW(req, res, next){
    const authStr = req.headers.authorization;
    const words = authStr.split(" ");
    const jwtToken = words[1];

    try{

        const decodedUser = jwt.verify(jwtToken, JWT_SECRET);
        if(decodedUser.username){
            next();
        }
        else{
            res.status(403).json({
                message : "You are not authorized"
            })
        }
    }
    catch(err){
        return res.status(401).json({
            err
        });
    }

    

    
}

module.exports = userMW;