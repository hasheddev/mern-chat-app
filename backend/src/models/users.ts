import { Schema, model, Types } from "mongoose";
import bcrypt from "bcryptjs";

const url = process.env.SERVER_URL as string;
const defaultProfileUrl = `${url}/static/profile/default.png`

export type User = {
    _id: string,
    userName: string,
    email: string,
    firstName?: string,
    lastName?: string,
    password: string,
    profile: string,
    contacts?: Types.ObjectId[],
    lastSeen?: Date
}

const UserSchema = new Schema<User>({
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    password: {type: String, required: true},
    profile: {type: String, required: true, default: defaultProfileUrl},
    contacts: [{type: Types.ObjectId, ref: "User"}],
    lastSeen: {type: Date, default: Date.now}
});

UserSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = model<User>("User", UserSchema);

export default User;