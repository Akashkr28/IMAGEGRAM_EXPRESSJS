import mongoose from "mongoose";
import { createUser } from "../repositories/userRepository.js";

export const signupUserService = async (user) => {
    try {
        const newUser = await createUser(user);

        return newUser;
    } catch (error) {
        if(error.name === "MongoServerError" && error.code === 11000) {
            throw {
                status: 400,
                message: "Email already exists",
            }
        }
        throw error;
    }
}