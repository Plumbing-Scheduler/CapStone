import { Management } from "../models/management.js";
import jwt from "jsonwebtoken";

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(404).json({ 'message': 'Username and Password are required' })

    const found = await Management.findOne({ email: email });
    if (!found) {
        return res.status(401).json({ "message": "Unauthorized" })
    }
    const match = await found.password.localeCompare(password);
    if (match === 0) {
        const accessToken = jwt.sign(
            {
                "email": found.email,
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: '30s' },
        );
        
        const refreshToken = jwt.sign(
            {email: found.email},
            process.env.REFRESH_TOKEN,
            {expiresIn: '2d'}
        )

        found.refreshToken = refreshToken;
        const result = await found.save();
        console.log(result);

        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000})
        res.json({accessToken});
    }
    else {
        return res.status(401).json({ "message": "Unauthorized" })
    }

}

export default { handleLogin };