const jwt = require("jsonwebtoken")

const authMiddleware = (req , res , next) => {
    try{

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            message: "Access token required"
        });
    }

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(
        token,
        "MY_SECRET_KEY"
    )

    req.user = decoded 
    next()



    } catch(error){
        return res.status(500).json({
            message: 'server error'
        })
    }
}

module.exports = authMiddleware