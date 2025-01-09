import { Request, Response } from "express";

import User from "../models/users";
import { setCookie } from "../utils";

export default class UserController {
    static async register(req: Request, res: Response): Promise<any> {
        const data = req.body;
        try {
            let user = await User.findOne({$or: [{userName: data.userName}, {email: data.email}]});
            if (user) {
                return res.status(400).json({message: "username or email already exists"});
            }
            user = new User(data);
            user = await user.save();
            setCookie(res, user);
            user = await User.findById(user._id).select("-password");
            if (user) {
                return res.status(201).json({user: user.toObject()});
            }
            return res.status(201).json({_id: "none"});
        } catch {
            return res.status(500).json({message: "something went wrong with server"});
        }
    }

    static async getUser(req: Request, res: Response): Promise<any> {
        const userId = req.params.id;
        try {
            const user = await User.findOne({_id: userId}).select("-password");
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(user);
        } catch {
            res.status(500).json({ message: "something went wrong" });
        }
    }

    static async getUserStatus(req: Request, res: Response): Promise<any> {
        console.log("succeded");
        return res.status(200).json({message: "success"});
    }
}
