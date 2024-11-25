const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

const maps = [];

const rooms = {};

io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);

    socket.on("getSID", () => {
        socket.emit("serverSendSID", socket.id);
    });

    socket.on("login", (data) => {
        rooms[data["player"]["ID"]] = data["player"];
        io.emit("serverSend", rooms);
        console.log("after login", rooms);
    });

    socket.on("playerUpdate", (data) => {
        if (data["ID"] in rooms) rooms[data["ID"]] = data;
        io.emit("updatedPlayer", data);
    });
    socket.on("setAction", (data) => {
        if (socket.id in rooms) io.emit("actionReceived", data);
    });
    socket.on("getZones", (location) => {
        console.log("getZones", location);
        socket.emit("zonesReceived", {
            zones: [
                [1, 10],
                [0, 10],
                [3, 10],
                [0, 10],
                [2, 10],
                [1, 10],
                [0, 10],
                [3, 10],
                [0, 10],
                [2, 10],
                [1, 10],
                [0, 10],
                [3, 10],
                [0, 10],
                [2, 10],
                [1, 10],
                [0, 10],
                [3, 10],
                [0, 10],
                [2, 10],
            ],
        });
    });
    socket.on("disconnect", () => {
        delete rooms[socket.id];
        console.log("user disconnected, rooms: ", rooms);
        io.emit("userDisconnected", socket.id);
        console.log("user disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
