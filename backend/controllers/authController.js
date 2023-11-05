import { Management } from "../models/management.js";
import jwt from "jsonwebtoken";

const handleLogin = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) return res.status(404).json({ 'message': 'Username and Password are required' })

    const found = await Management.findOne({ email: user });
    if (!found) {
        return res.status(401).json({ "message": "Unauthorized" })
    }
    const match = found.password.localeCompare(password);
    if (match === 0) {
    }
    else {
        return res.status(401).json({ "message": "Unauthorized" })
    }

}
export default { handleLogin };