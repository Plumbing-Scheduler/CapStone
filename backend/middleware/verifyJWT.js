import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(req.headers);
    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN,
        (err) => {
            if(err) return res.sendStatus(403);
            next();
        }
        );
}

export default verifyJWT;