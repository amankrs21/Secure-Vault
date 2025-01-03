require("dotenv").config();
const cors = require("cors");
const http = require("http");
const express = require("express");

const router = require("./src/app.router.js");
const mongoConnect = require("./src/db.config.js");
const errorHandler = require("./src/error.handler.js");


const app = express();
const port = process.env.PORT ?? 3000;

// Disable x-powered-by header to prevent version disclosure
app.disable("x-powered-by");

// command to parse the incoming request
app.use(express.json());


// check if all the keys are provided
if (!process.env.MONGO_URL || !process.env.SECRET_KEY || !process.env.PASSWORD_KEY) {
    console.error("Please provide all the .env keys!!");
    console.error("MONGO_URI, SECRET_KEY, PASSWORD_KEY");
    process.exit(1);
}


// connect to the database
mongoConnect();


// Middleware to log all the requests
app.use((req, res, next) => {
    console.info(`${Date().slice(4, 24)} [${req.method}] http://${req.ip}${req.url}`);
    next()
})


// setting up cors
const allowedOrigins = [
    "http://localhost:5173",
    "http://192.168.1.39:5173",
    "https://securevault.pages.dev"
]
const corsOptions = {
    credentials: true,
    origin: allowedOrigins,
    exposedHeaders: "Authorization",
    methods: "GET,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));


// setting up router
app.use("/api", router);
app.get('/health', (req, res) => { res.json({ message: 'Health of Secure-Vault Server is up and running!!' }) });


// error-handling middleware
app.use(errorHandler);


// creating server with Express app and http
const server = http.createServer(app);
server.listen(port, '0.0.0.0', () => {
    console.info(`Dev Server running at http://localhost:${port}`);
});
