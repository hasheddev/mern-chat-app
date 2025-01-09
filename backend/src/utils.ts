import { Response } from "express";
import jwt from "jsonwebtoken";
import {User} from "./models/users";

export const setCookie = (res: Response, user: User) => {
    const cookie = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY as string, {expiresIn: "1d"});
    res.cookie("token", cookie, {maxAge: 86400000, httpOnly: true, secure: process.env.NODE_ENV === "production"})
}
