import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 6,
        validate: {
            validator: function(emailValue) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
            },
            message: 'Please enter a valid email address'
        },
        password: {
            type: String,
            required: true,
            minLength: 5
        }
    }
}, { timestamps: true });

userSchema.pre('save', async function modifyPassword(next) {
    // incoming user object
    const user = this; //object with plain password

    // Only hash the password if it has been modified (or is new)
    if (user.isModified('password')) {
        try {
            const SALT = await bcrypt.genSalt(9);           // Generate salt asynchronously
            const hashedPassword = await bcrypt.hash(user.password, SALT); // Hash password asynchronously
            user.password = hashedPassword;
        } catch (error) {
            return next(error); // Pass the error to the next middleware if hashing fails
        }
    }

    next();
});

const user = mongoose.model("user", userSchema); //user collection

export default user;