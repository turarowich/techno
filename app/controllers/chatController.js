module.exports = io => {
    const listener = (...args) => {
        console.log(args);
    }

    io.on('connection', (socket) => {
        socket.on("details", listener)
        socket.on('init', (user) => {
            console.log("user joined")
            socket.join(user)
        });
        socket.on('message', (msg) => {
            console.log('broadcasting')
            socket.join(msg.user)
            socket.broadcast.to(msg.user).emit("server message", msg)
        });
    });
};
