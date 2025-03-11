import "dotenv/config";
const ACCESS_TOKEN = "accessToken";
const DB_NAME = "chat_application";
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 3600000,
    sameSite: "Strict",
};
export { ACCESS_TOKEN, DB_NAME, cookieOptions };
