module.exports = io => {
    const listener = (...args) => {
        console.log(args);
    }

    io.on('connection', (socket) => {
           
        socket.on('init', function (msg) {
            socket.join(msg.user)
        });
        socket.on("details", listener)

        socket.on('message', (msg) => {
            console.log("got message " + msg.message);
            console.log(socket.id)
            io.to('aligator').emit("server message", msg.message)
        });
    });
};

