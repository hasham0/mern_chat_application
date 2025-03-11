import { createMessage } from "../lib/services/message.service.js";
import { ValidationError } from "../lib/utils/customize-error-messages.js";
import asyncHandler from "../middlewares/async-handler.middleware.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import cloudinary from "../lib/utils/cloudinary/cloudinary.js";

const usersForSideBar = asyncHandler(async (request, response) => {
    // Get all users except the logged in user
    const loggedInUserId = request.user._id;
    const filterUser = await User.find({ _id: { $ne: loggedInUserId } });
    return response.status(200).json({
        users: filterUser,
    });
});

const userMessages = asyncHandler(async (request, response) => {
    // validate request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }

    // Get messages between the logged in user and the user to chat with
    const { id: userToChatId } = request.params;
    const myId = request.user._id;
    const messages = await Message.find({
        $or: [
            { senderId: myId, reciverId: userToChatId },
            { senderId: myId, reciverId: myId },
        ],
    });
    return response.status(200).json({
        messages,
    });
});

const sendMessage = asyncHandler(async (request, response) => {
    // validate request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }
    const { text, image } = request.body;
    const { id: reciverId } = request.params;
    const senderId = request.user._id;

    // upload image to cloudinary
    let imageUrl = "";
    if (image) {
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(image, {
                folder: "chat_application",
            });
            imageUrl = cloudinaryResponse.secure_url;
        } catch (error) {
            throw new Error("Image upload failed");
        }
    }
    // create message
    const newMessage = await createMessage({
        senderId,
        reciverId,
        text,
        imageUrl,
    });

    // TODO: realtime functionaity usuig socket.io
    return response.status(201).json({
        messages: newMessage,
    });
});

export { usersForSideBar, userMessages, sendMessage };
