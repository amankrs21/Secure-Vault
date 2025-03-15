require("dotenv").config();
const cors = require("cors");
const express = require("express");

const router = require("./router/index.route");
const errorHandler = require("./middleware/error.handler");


const app = express();

// Disable x-powered-by header to prevent version disclosure
app.disable("x-powered-by");

// Parse incoming JSON requests
app.use(express.json());


// Check if all the necessary environment keys are provided
const requiredEnvVars = ["CORS_ORIGIN", "MONGO_URL", "JWT_SECRET", "PASSWORD_KEY"];
requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        console.error(`Missing environment variable: ${key}`);
        process.exit(1);
    }
});


// Middleware to log all requests
app.use((req, res, next) => {
    if (req.method !== "OPTIONS" || process.env.NODE_ENV === "development") {
        console.info(`${Date().slice(4, 24)} [${req.method}] http://${req.ip}${req.url}`);
    }
    next();
});


// Configure CORS
const allowedOrigins = process.env.CORS_ORIGIN.split(",");
const corsOptions = {
    credentials: true,
    origin: allowedOrigins,
    exposedHeaders: "Authorization",
    methods: "GET,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));


// Set up routes
app.use("/", express.static("public"));
app.use("/api", router);


// Error-handling middleware
app.use(errorHandler);


// Export the Express app
module.exports = app;
