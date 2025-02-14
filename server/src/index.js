const http = require("http");

const app = require('./app');

const port = process.env.PORT ?? 3000;

// Create server with Express app and HTTP
const server = http.createServer(app);
server.listen(port, "0.0.0.0", () => {
    console.info(`Express Server started on PORT: ${port}`);
});
