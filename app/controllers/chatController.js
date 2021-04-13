const { useDB } = require('../../services/helper')
const verifyTokenSocket = require('../../services/verifyTokenSocket');
const user = require('../models/user');
module.exports = io => {
    const listener = (...args) => {
        console.log(args);
    }
    io.use((socket, next) => {
        verifyTokenSocket(socket, next)
    });
    io.on('connection', (socket) => {
        socket.on("details", listener)
        socket.on('init', (user) => {
            console.log("client joined ")
            socket.join(user)
        });
        socket.on('message', (data) => {
            addMessage(socket, data)
            socket.join(data.user)
            socket.broadcast.to(data.user).emit("server message", data)
        });

        socket.on('get messages', (user) => {
            socket.join(user)
            getMessages(io, socket, user)
        });

    });
};
async function addMessage(socket, data){
    let db = useDB(socket.handshake.headers.db)
    let Message = db.model("Message");
    let Client = db.model("Client");
    let message = await new Message({
        client: data.user,
        text: data.text,
        isIncoming: data.isIncoming
    }).save();

    Client.findOneAndUpdate({ '_id': data.user }, { $push: { messages: message } }).exec()
}
async function getMessages(io, socket, user) {
    let db = useDB(socket.handshake.headers.db)
    let Client = db.model("Client");
    let client = await Client.findById(user).populate('messages').exec()
    console.log("emitting all messages")
    io.to(socket.id).emit("all messages", client.messages)
}