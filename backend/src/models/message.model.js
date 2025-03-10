import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const messageSchema = new Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        reciverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

const Message = models.Message || model("Message", messageSchema);
export default Message;
