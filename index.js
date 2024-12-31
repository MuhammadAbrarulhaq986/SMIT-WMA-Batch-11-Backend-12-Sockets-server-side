import express from "express";
const app = express();
import http from "http"
import { Server } from "socket.io";

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    socket.on("Message", (message) => {
        console.log("User message ==>", message);

        io.emit("Message", message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

app.get("/", (req, res) => {
    res.send("<h1>HELLO BOSS MAN</h1>")
})

server.listen(3000, () => {
    console.log("Listening on *:3000");
});