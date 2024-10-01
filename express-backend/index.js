require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connect = require("./Config.js");
const router = require("./Router/Router.js");
const app = express();
const port = 3000;

app.use(express.json());

connect();

// Middleware to log all the requests
app.use((req, res, next) => {
    console.log(`${Date().slice(0, 24)} => (${req.method}) http://${req.ip.slice(7)}${req.url}`);
    next()
})

// setting up cors
const allowedOrigins = ["http://localhost:5173", "http://192.168.1.38:5173", "https://todomern.pages.dev"]
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
};
app.use(cors(corsOptions))

// setting up controller
app.use("/api", router);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at => http://localhost:${port}/`);
});
