const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            const err = new Error("No token provided");
            err.status = 401;
            throw err;
        }

        const token = authHeader.split(" ")[1];
        const secret = JWT_SECRET || "secretkey";
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        error.status = error.status || 401;
        next(error);
    }
};

module.exports = authMiddleware;