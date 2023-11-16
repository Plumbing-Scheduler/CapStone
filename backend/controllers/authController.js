import { Employee } from "../models/employee.js";
import jwt from "jsonwebtoken";

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(404).json({ 'message': 'Username and Password are required' })

    const found = await Employee.findOne({ email: email });
    if (!found) {
        return res.status(401).json({ "message": "Unauthorized" })
    };

    await found.comparePassword(password, function(err, isMatch){
    if (isMatch == true) {
        const accessToken = jwt.sign(
            {
                "email": found.email,
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: '1h' },
        );
        
        const refreshToken = jwt.sign(
            {email: found.email},
            process.env.REFRESH_TOKEN,
            {expiresIn: '10d'}
        );

        found.refreshToken = refreshToken;
        found.save();
        const user = {
            firstName: found.firstName,
            email: found.email
        };
        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000})
        res.json({
            accessToken, 
            user
        });
    }
    else {
        return res.status(401).json({ "message": "Unauthorized" })
    };
});
};

export default { handleLogin };