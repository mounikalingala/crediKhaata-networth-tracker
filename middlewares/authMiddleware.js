const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send({ message: 'Access Denied: No token provided' });

    const [scheme, token] = authHeader.split(" ")

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Access Denied: Malformed token' })
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({ message: 'Invalid Token' });
    }
};
