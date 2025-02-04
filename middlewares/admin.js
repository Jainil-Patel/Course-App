const { Admin } = require("../db/index_db");



function adminMW(req, res, next){
    const authStr = req.headers.authorization;
    const words = authStr.split(" ");
    const jwtToken = words[1];

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

module.exports = adminMW;