import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['Authorisation'];

        if (!token) {
            return res.status(403).json({ message: 'A token is required for authentication' });
        }

        if(token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }

    return next();
}