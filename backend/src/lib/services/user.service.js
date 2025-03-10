import { CustomValidation } from "express-validator/lib/context-items/custom-validation.js";
import User from "../../models/user.model.js";

const createUser = async ({ fullname, email, password }) => {
    try {
        return await User.create({ fullname, email, password });
    } catch (error) {
        throw new CustomValidation("Error while creating user", 400);
    }
};

export { createUser };
