import jwt from "jsonwebtoken";
import {Management} from '../models/management.js';

const handleRefresh = async (req, res) => {
    const cookies = req.cookies;
    
    if(!cookies?.jwt2) return res.sendStatus(401);
    const refreshToken = cookies.jwt2;

    const foundUser = await Management.findOne({ refreshToken });

    if(!foundUser) return res.sendStatus(403);//Forbidden

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        (err, decoded) => {
            if(err) return res.sendStatus(403);
            const accessToken = jwt.sign(  
                    {
                        "email": decoded.email,
                    },
                    process.env.ACCESS_TOKEN,
                    { expiresIn: '120s' }
            );
            res.json({accessToken})
        }
    );
};

export default {handleRefresh};