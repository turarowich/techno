const { useDB, checkAccess } = require('../../services/helper')
const user = require('../models/user');
const pushController = require('./pushController');
class SocketController {
    addMessage = async function (io, socket, data) {
        let db = useDB(socket.handshake.headers.db)
        let Message = db.model("Message");
        let Client = db.model("Client");
        
        if (socket.handshake.headers.userType == "employee") {
            let checkResult = await checkAccess(socket.handshake.headers.user, { access: "chat", parametr: "active", parametr2: "canEdit"}, db)
            if (checkResult) {
                io.to(socket.id).emit("warning message", checkResult.msg)
                return;
            }
        }
        let message = await new Message({
            client: data.user,
            text: data.text,
            isIncoming: data.isIncoming,
            new: true,
        }).save();

        Client.findOneAndUpdate({ '_id': data.user }, { $push: { messages: message }, 'lastMessageAt': new Date() }).exec()
        if (data.isIncoming){
            await pushController.sendNewMessage(socket.handshake.headers.db, data.user, message)
        }
        
    }
    readMessage = async function (socket, msg) {
        let db = useDB(socket.handshake.headers.db)
        let Message = db.model("Message");
        if (socket.handshake.headers.userType == "employee") {
            let checkResult = await checkAccess(socket.handshake.headers.user, { access: "chat", parametr: "active" }, db)
            if (checkResult) {
                return;
            }
        }
        let updated = await Message.updateMany({ client: msg.client, isIncoming: msg.isIncoming }, { new: false });
    }
    getMessages = async function (io, socket, user) {
        let db = useDB(socket.handshake.headers.db)
        let Message = db.model("Message");
        if (socket.handshake.headers.userType == "employee") {
            let checkResult = await checkAccess(socket.handshake.headers.user, { access: "chat", parametr: "active" }, db)
            if (checkResult) {
                return;
            }
        }
        await Message.updateMany({ client: user, isIncoming: true }, { new: false });
        let messages = await Message.find({ client: user }).sort({ $natural: -1 }).limit(50);

        io.to(socket.id).emit("all messages", messages)
    }

    sendNewsNotification = async function (io, socket, id) {
        let db = useDB(socket.handshake.headers.db)
        let News = db.model("News");
        let data = await News.findById(id)
        
        if(data){
            socket.to(socket.handshake.headers.mainRoom).emit("server news notification", data)
        }
    }
}
module.exports = new SocketController();

