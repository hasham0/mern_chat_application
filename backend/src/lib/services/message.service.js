import Message from "../../models/message.model.js";

const createMessage = async ({ senderId, reciverId, text, imageUrl }) => {
    return await Message.create({
        senderId,
        reciverId,
        text: text || "",
        image: imageUrl,
    });
};

export { createMessage };
