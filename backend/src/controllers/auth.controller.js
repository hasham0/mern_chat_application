import asyncHandler from "../middlewares/async-handler.middleware.js";
import { validationResult } from "express-validator";
import { ACCESS_TOKEN, cookieOptions } from "../constant.js";
import User from "../models/user.model.js";
import {
    CustomError,
    ValidationError,
} from "../lib/utils/customize-error-messages.js";
import { createUser } from "../lib/services/user.service.js";
import cloudinary from "../lib/utils/cloudinary/cloudinary.js";

const signup = asyncHandler(async (request, response) => {
    // Validate request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }

    // Extract data from request
    const { fullname, email, password } = request.body;

    // Check if user already exists
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
        throw new CustomError("User email already exists", 400);
    }

    // create new user
    const user = await createUser({
        fullname,
        email,
        password,
    });

    // Generate token
    const token = await user.generateAuthToken();

    // Remove password from user object
    delete user._doc.password;

    return response
        .cookie(ACCESS_TOKEN, token, cookieOptions)
        .status(201)
        .json({
            user,
        });
});

const login = asyncHandler(async (request, response) => {
    // Validate request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }

    // Extract data from request
    const { email, password } = request.body;

    // Check if user already exists
    const isUserExists = await User.findOne({ email }).select("+password");
    if (!isUserExists) {
        throw new CustomError("Invalid Credentials", 400);
    }

    // Check if password is correct
    const isPasswordCorrect = await isUserExists.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomError("Invalid Credentials", 400);
    }

    // Generate token
    const token = await isUserExists.generateAuthToken();

    // Remove password from user object
    delete isUserExists._doc.password;

    return response
        .cookie(ACCESS_TOKEN, token, cookieOptions)
        .status(200)
        .json({ user: isUserExists });
});

const updateProfile = asyncHandler(async (request, response) => {
    // validate request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }

    // extract and validate data from request
    const { profilePicture } = request.body;
    if (!profilePicture) {
        throw new CustomError("Profile Picture is required", 400);
    }

    // get user id from request
    const userID = request.user._id;

    // upload image to cloudinary
    let cloudinaryImageResponse;
    try {
        cloudinaryImageResponse = await cloudinary.uploader.upload(
            profilePicture,
            {
                folder: "chat_application",
            }
        );
    } catch (error) {
        throw new CustomError("Error uploading image", 500);
    }

    // update user profile picture
    const updatedUser = await User.findByIdAndUpdate(
        userID,
        {
            profilePicture: cloudinaryImageResponse.secure_url,
        },
        { new: true }
    );
    return response.status(200).json({ user: updatedUser });
});

const checkAuth = asyncHandler(async (request, response) => {
    return response.status(200).json({ user: request.user });
});

const logout = asyncHandler(async (request, response) => {
    return response
        .clearCookie(ACCESS_TOKEN, "", {
            maxAge: 0,
        })
        .status(200)
        .json({ message: "Logged out Successfully" });
});

export { signup, login, updateProfile, checkAuth, logout };
