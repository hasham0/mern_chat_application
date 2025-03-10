import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { Schema, model, models } = mongoose;

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: [true, "Fullname is required"],
            minLength: [3, "Fullname must be at least 3 characters"],
            maxLength: [50, "Fullname must be at most 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            minLength: [6, "Email must be at least 6 characters"],
            maxLength: [50, "Email must be at most 50 characters"],
            match: [
                /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                "Invalid email format",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [6, "Password must be at least 6 characters"],
            select: false,
        },
        profilePicture: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
    return bcryptjs.compare(password, this.password);
};

// Generate Auth Token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email, timestamp: Date.now() },
        process.env.JWT_SECRET_KEY || "defaultSecret",
        { expiresIn: "24h" }
    );
};

const User = models.User || model("User", userSchema);
export default User;
