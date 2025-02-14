require("dotenv").config();
const cors = require("cors");
const express = require("express");

const router = require("./app.router");
const mongoConnect = require("./db.config");
const errorHandler = require("./error.handler");


const app = express();

// Disable x-powered-by header to prevent version disclosure
app.disable("x-powered-by");

// Parse incoming JSON requests
app.use(express.json());


// Check if all the necessary environment keys are provided
const requiredEnvVars = ["MONGO_URL", "SECRET_KEY", "PASSWORD_KEY"];
requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        console.error(`Missing environment variable: ${key}`);
        process.exit(1);
    }
});


// Connect to the database
mongoConnect();


// Middleware to log all requests
app.use((req, res, next) => {
    if (req.method !== "OPTIONS" && process.env.NODE_ENV === "development") {
        console.info(`${Date().slice(4, 24)} [${req.method}] http://${req.ip}${req.url}`);
    }
    next();
});


// Configure CORS
const allowedOrigins = process.env.NODE_ENV === "development"
    ? [
        "http://localhost:5173",
        "http://192.168.1.39:5173"
    ] : [
        "https://securevault.pages.dev",
        "https://dev.securevault.pages.dev"
    ];

const corsOptions = {
    credentials: true,
    origin: allowedOrigins,
    exposedHeaders: "Authorization",
    methods: "GET,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));


// Set up routes
app.use("/api", router);
app.get("/health", (req, res) => {
    res.json({ message: "Health of Secure-Vault Server is up and running!" });
});


// Error-handling middleware
app.use(errorHandler);


// Export the Express app
module.exports = app;
