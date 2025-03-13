const http = require("http");

const app = require('./app');
const mongoConnect = require("./config/mongo.config.js");


const port = process.env.PORT ?? 3000;


// Connect to the database
mongoConnect();


// Create server with Express app and HTTP
const server = http.createServer(app);
server.listen(port, "0.0.0.0", () => {
    console.info(`\x1b[36m☠️  SERVER STARTED AT PORT: ${port}\x1b[0m`);
});
