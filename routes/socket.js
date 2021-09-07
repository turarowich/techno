var controller = require('../app/controllers/socketController');
const verifyTokenSocket = require('./../services/verifyTokenSocket');
var allClients = [];
module.exports = io => {
    const listener = (...args) => {
        console.log(args,"SOCKET");
    }
    io.use((socket, next) => {
        verifyTokenSocket(socket, next)
    });
    io.on('connection', (socket) => {
        allClients.push(socket.id);
        console.log(socket.id,"SOCKET ID <<<<<<<<<<<<<<<<<<<<");
        console.log(allClients,"ALL SOCKET ID <<<<<<<<<<<<<<<<<<<<");
        socket.on("details", listener)
        socket.on('init_admin', () => {
            console.log("init_admin")
            socket.join(socket.handshake.headers.db)
            console.log(io.sockets.adapter.rooms,"ROOMS");
        });
        socket.on('init', (user) => {
            console.log(user ,"init")
            socket.join(user)
        });
        socket.on('join_cat', (data) => {
            console.log(data,"JOIN CAT")
            socket.join(data.user);
            // controller.sendHey(io);
        });
        socket.on('disconnect', (reason) => {
            console.log(`${reason} Got disconnect! ${socket.id}`);
            // socket.connect();
            var i = allClients.indexOf(socket);
            // allClients.splice(i, 1);
        });
        socket.on('read messages', (msg) => {
            controller.readMessage(socket, msg)
        });
        socket.on('message', (data) => {
            console.log(data,"message")
            controller.addMessage(io, socket, data)
            socket.join(data.user)
            socket.broadcast.to(data.user).to(socket.handshake.headers.db).emit("server message", data)
        });

        socket.on('get messages', (user) => {
            socket.join(user)
            controller.getMessages(io, socket, user)
        });

        socket.on('get new messages', (user, from) => {
            controller.getNewMessages(io, socket, user, from)
        });

        socket.on('send news notification', (newsID) => {
            controller.sendNewsNotification(io, socket, newsID)
        });

    });


};