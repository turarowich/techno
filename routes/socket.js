var controller = require('../app/controllers/socketController');
const verifyTokenSocket = require('./../services/verifyTokenSocket');
module.exports = io => {
    const listener = (...args) => {
        console.log(args);
    }
    io.use((socket, next) => {
        verifyTokenSocket(socket, next)
    });
    io.on('connection', (socket) => {
        socket.on("details", listener)
        socket.on('init_admin', () => {
            console.log('init admin',socket.handshake.headers.db)
            socket.join(socket.handshake.headers.db)
        });
        socket.on('init', (user) => {
            console.log(user)
            socket.join(user)
        });
        socket.on('read messages', (msg) => {
            controller.readMessage(socket, msg)
        });
        socket.on('message', (data) => {
            console.log(data)
            controller.addMessage(socket, data)
            socket.join(data.user)
            socket.broadcast.to(data.user).to(socket.handshake.headers.db).emit("server message", data)
        });

        socket.on('get messages', (user) => {
            socket.join(user)
            controller.getMessages(io, socket, user)
        });

        socket.on('send news notification', (newsID) => {
            controller.sendNewsNotification(io, socket, newsID)
        });

    });
};