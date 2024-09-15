const jwt = require("jsonwebtoken")
const JWT_SECRET = "kushrueee"

function auth (req, res, next) {
    const token = req.headers.token;

    const decodeData = jwt.verify(token, JWT_SECRET);

    if(decodeData) {
        req.userId = decodeData.id;
        next();
    } else{
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
}

module.export = {
    auth,
    JWT_SECRET
}