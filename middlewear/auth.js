const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  

    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    jwt.verify(token, '81b89a9e19f30b9bc1da2167d30dc31dd6cee84940c6fb5f841aff5bc4760b74', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = decoded;  
        next();  
    });
};

module.exports = { verifyToken };
