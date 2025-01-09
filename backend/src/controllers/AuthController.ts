import { Request, Response } from "express";

import User from "../models/users";
import { setCookie } from "../utils";
import bcrypt from "bcryptjs"

export default class AuthContoller {
    static async login(req: Request, res: Response): Promise<any> {
        const {email, password} = req.body
        if (!email) {
            return res.status(400).json({ message: "email is required" });
        }
        if (!password) {
            return res.status(400).json({ message: "password is required" });
        }
        try {
            const user = await User.findOne({email}); 
            if(!user) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const isValidPass = await bcrypt.compare(password, user.password);
            if(!isValidPass) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            setCookie(res, user);
            let jsonUser = user.toObject();
            jsonUser.password = "";
            return res.status(200).json(jsonUser);
        } catch (error) {
            return res.status(500).json({ message: "something went wrong" });
        }
    }
    static async logout(req: Request, res: Response): Promise<any> {
        res.clearCookie("token");
        res.status(200);
    }
}