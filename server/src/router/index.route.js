const express = require("express");

const pinRoute = require("./pin.route");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const vaultRoute = require("./vault.route");
const journalRoute = require("./journal.route");
const validSession = require("../middleware/session.middleware");


const router = express.Router();


// health check route
router.get("/health", (req, res) => {
    res.send("Health of SecureVault Server is up and running!");
});

// auth route
router.use("/auth", authRoute);

// user route
router.use("/user", validSession, userRoute);

// PIN Routes
router.use("/pin", validSession, pinRoute);

// vault Routes
router.use("/vault", validSession, vaultRoute);

// journal Routes
router.use("/journal", validSession, journalRoute);


// exporting the router
module.exports = router;
