import { adminAuth } from "../config/firebaseAdmin.js";

export const verifyFirebaseToken = async (req, res, next) => {

    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token missing"
            });
        }

        const decodedToken = await adminAuth.verifyIdToken(token);

        console.log(decodedToken);
        
        req.user = decodedToken;
        next();

    } catch (error) {

        return res.status(401).json({
            message: "Unauthorized"
        });
    }
};


