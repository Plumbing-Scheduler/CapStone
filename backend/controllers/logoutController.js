import { Management } from "../models/management.js";

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); //no content
    const refreshToken = cookies.jwt;

    //Checks for RefreshToken in DB
    const foundUser = await Management.findOne({ refreshToken });
    if(!foundUser) {
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000});
        return res.sendStatus(204);
    }

    //Delete RefreshToken in DB
    foundUser.refreshToken = '';
    const result = await foundUser.save();

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000});//secure: true - only servers on https
    res.sendStatus(204);
};

export default {handleLogout};