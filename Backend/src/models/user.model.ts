import { Schema, model } from 'mongoose';

// Types...
export type UserType = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

const userSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const User = model<UserType>('User', userSchema);
export default User;
