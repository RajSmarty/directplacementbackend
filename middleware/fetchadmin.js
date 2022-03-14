var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.scrtKey;

const fetchadmin = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const admintoken = req.header('auth-token');
    if (!admintoken) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(admintoken, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchadmin;