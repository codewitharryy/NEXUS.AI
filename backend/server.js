require("dotenv").config();
const app = require("./src/app")
const connectDb = require("./src/db/db");
const initSocketServer = require("./src/sockets/socket.server");
const httpServer = require("http").createServer(app);



connectDb()
initSocketServer(httpServer);

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


