const jwt = require("jsonwebtoken");


const secret = "kyakrrha&bahi";

const fetchUser = (req,res,next)=>{

    const token = req.header("auth-token");

    if(!token){
        res.status(401).send({error : "invalid user token"})
    }

    try {
        const data = jwt.verify(token,secret);
        req.user = data.user
        next()
    } catch(err){
        console.log(err.message)
        res.status(401).send({error : "invalid user token"})
    }
}

module.exports = fetchUser;