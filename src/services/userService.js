import { createUser } from "../repositories/userRepository.js";

export const signupUserService = async (user) => {
    try {
        const newUser = await createUser(user);

        return newUser;
    } catch (error) {
        console.log("service error", error)
        throw error;
    }
}