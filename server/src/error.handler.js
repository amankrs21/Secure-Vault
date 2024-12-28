
// Centralized error-handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Custom error handling based on the error message
    if (err.message === "Unsupported state or unable to authenticate data") {
        return res.status(400).send({ message: "Invalid Encryption Key!" });
    }

    // Default error response
    res.status(500).send({ message: "Something went wrong!" });
};

// export the error handler
module.exports = errorHandler;
