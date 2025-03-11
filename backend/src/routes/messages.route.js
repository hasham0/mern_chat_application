import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { param, body } from "express-validator";
import {
    userMessages,
    usersForSideBar,
    sendMessage,
} from "../controllers/message.controller.js";

const router = Router();

router.route("/users").get([authMiddleware], usersForSideBar);

router
    .route("/:id")
    .get(
        [
            authMiddleware,
            param("id").isString().withMessage("ID must be a string"),
        ],
        userMessages
    );
router.route("/send/:id").post(
    [
        authMiddleware,
        param("id").isString().withMessage("ID must be a string"),
        body("text").optional().isString().withMessage("Text cannot be empty"),
        body("image")
            .optional()
            .custom((value) => {
                if (
                    value &&
                    !/^data:image\/(jpeg|png|gif|webp);base64,/.test(value)
                ) {
                    throw new Error(
                        "Image must be a valid base64-encoded image"
                    );
                }
                return true;
            }),
        body().custom((value) => {
            if (!value.text && !value.image) {
                throw new Error("Either text or an image must be provided.");
            }
            return true;
        }),
    ],
    sendMessage
);

export default router;
