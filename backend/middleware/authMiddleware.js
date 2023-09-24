import {validateToken} from "../lib/auth.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.jwt

    if (!token) return res.status(403).json({message: "Authentification failed!"});
    
    try {
        req.user = await validateToken(token);
        next();
    } catch (error) {
        return res.status(401).json({message:"Authenticaton failed!", error});
    }
}