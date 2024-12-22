require("dotenv").config();
const cors = require("cors");
const http = require("http");
const express = require("express");

const mongoConnect = require("./mongoConfig.js");
const router = require("./Router/Router.js");

const app = express();
const port = process.env.PORT ?? 3000;

// Disable x-powered-by header to prevent version disclosure
app.disable("x-powered-by");

// command to parse the incoming request
app.use(express.json());


// check if all the keys are provided
if (!process.env.MONGO_URI || !process.env.SECRET_KEY || !process.env.PASSWORD_KEY) {
    console.error("Please provide all the .env keys!!");
    console.error("MONGO_URI, SECRET_KEY, PASSWORD_KEY");
    process.exit(1);
}


// connect to the database
mongoConnect();


// Middleware to handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// setting up cors
const allowedOrigins = [
    "https://securevault.pages.dev",
    "https://dev.securevault.pages.dev",
    "https://test.securevault.pages.dev",
]
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
};
app.use(cors(corsOptions))


// setting up router
app.use("/api", router);
app.get("/", (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send('Hello World!');
});
app.get('/health', (req, res) => { res.json({ message: 'Health of SecureVault is good!' }) });

// Create server with Express app
const server = http.createServer(app);

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
