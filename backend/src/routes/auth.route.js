import { Router } from "express";
import {
    signup,
    login,
    logout,
    updateProfile,
    checkAuth,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { body } from "express-validator";

const router = Router();

router
    .route("/signup")
    .post(
        [
            body("fullname")
                .isLength({ min: 3 })
                .withMessage("fullname must be atlest 3 character long"),
            body("email").isEmail().withMessage("Invalid email"),
            body("password")
                .isLength({ min: 6 })
                .withMessage("password must be atlest 6 character long"),
        ],
        signup
    );
router
    .route("/login")
    .post(
        [
            body("email").isEmail().withMessage("Invalid email"),
            body("password")
                .isLength({ min: 6 })
                .withMessage("password must be atlest 6 character long"),
        ],
        login
    );

router
    .route("/update-profile")
    .put(
        [authMiddleware],
        [
            body("profilePicture")
                .isString()
                .withMessage("Invalid profilePicture"),
        ],
        updateProfile
    );

router.route("/check").get([authMiddleware], checkAuth);

router.route("/logout").post([authMiddleware], logout);

export default router;
