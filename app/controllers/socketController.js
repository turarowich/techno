const { useDB } = require('../../services/helper')
const user = require('../models/user');
const pushController = require('./pushController');
class SocketController {
    addMessage = async function (socket, data) {
        let db = useDB(socket.handshake.headers.db)
        let Message = db.model("Message");
        let Client = db.model("Client");
        let message = await new Message({
            client: data.user,
            text: data.text,
            isIncoming: data.isIncoming
        }).save();

        Client.findOneAndUpdate({ '_id': data.user }, { $push: { messages: message } }).exec()
        if (data.isIncoming){
            await pushController.sendNewMessage(socket.handshake.headers.db, data.user, message)
        }
        
    }
    getMessages = async function (io, socket, user) {
        let db = useDB(socket.handshake.headers.db)
        let Client = db.model("Client");
        let client = await Client.findById(user).populate('messages').exec()
        
        io.to(socket.id).emit("all messages", client.messages)
    }

    sendNewsNotification = async function (io, socket, id) {
        let db = useDB(socket.handshake.headers.db)
        let News = db.model("News");
        let data = await News.findById(id)
        
        if(data){
            console.log(socket.handshake.headers.mainRoom)
            socket.to(socket.handshake.headers.mainRoom).emit("server news notification", data)
        }
    }
}
module.exports = new SocketController();

