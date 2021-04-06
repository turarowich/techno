module.exports = io => {
    const listener = (...args) => {
        console.log(args);
    }

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on("details", listener)

        socket.on('message', (msg) => {
            console.log("got message " + msg.message);
            socket.emit("server message", "send it back")
        });
    });
};

