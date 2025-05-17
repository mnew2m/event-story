import * as process from "node:process";

export const configuration = () => ({
    AUTH_SERVICE: process.env.AUTH_SERVICE_URL,
    AUTH_DB: process.env.MONGODB_URI_AUTH,
    EVENT_SERVICE: process.env.EVENT_SERVICE_URL,
    EVENT_DB: process.env.MONGODB_URI_EVENT,
    JWT: {
        SECRET: process.env.JWT_SECRET,
        EXPIRES_IN: process.env.JWT_EXPIRES_IN
    }
});