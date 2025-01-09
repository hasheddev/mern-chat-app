import { Request, Response, NextFunction } from "express"
import jwt, {JwtPayload} from "jsonwebtoken";

import { type User } from "../models/users";

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
};

export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
    const cookie = req.cookies["token"];
    if (!cookie) {
        return res.status(401).json({ message: "unauthorized" });
    }

    try {
        const decodedToken = jwt.verify(cookie, process.env.JWT_SECRET_KEY as string) as JwtPayload;
        const {userId} = decodedToken;
        req.userId = userId;
        next();
    } catch {
        return res.status(401).json({ message: "unauthorized" }); 
    }
    
}

export const verifyRequestData = (req: Request, res: Response, next: NextFunction): any => {
	const body: User & {comfirmPassword: string} = req.body;
    if (body.userName.length < 2) {
		return res.status(400).json({ message: "username must be provided and must ba at least two characters" });
	}

    if (!body.email) {
		return res.status(400).json({ message: "email must be provided" });
	}

    if (!body.password) {
		return res.status(400).json({ message: "password must be provided" });
	}

    if (body.password.length < 5) {
		return res.status(400).json({ message: "password must be at least 5 characters" });
	}

    if (body.password !== body.comfirmPassword) {
        return res.status(400).json({ message: "password must eqaul to comfirm password" });
    }

	next();
}
