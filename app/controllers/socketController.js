const { useDB, checkAccess } = require('../../services/helper')
const user = require('../models/user');
const pushController = require('./pushController');
class SocketController {
    addMessage = async function (io, socket, data) {
        // if(typeof data == 'string' ){
        //     data = JSON.parse(data)
        // }

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
        console.log("new message ", data)
        let message = await new Message({
            client: data.user,
            text: data.text || "uu",
            isIncoming: data.isIncoming,
            new: true,
        }).save();

        await Client.findOneAndUpdate({'_id': data.user}, {
            $push: {messages: message},
            'lastMessageAt': new Date()
        }).exec()
        if (data.isIncoming){
            try{
                await pushController.sendNewMessage(socket.handshake.headers.db, data.user, message)
            }catch (e){
                console.log(e)
            }

            try{
                await pushController.sendNewMessageAndroid(socket.handshake.headers.db, data.user, message)
            }catch (e) {
                console.log(e)
            }
            
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
        console.log("HERE",user);
        let db = useDB(socket.handshake.headers.db)
        let Message = db.model("Message");
        if (socket.handshake.headers.userType == "employee") {
            let checkResult = await checkAccess(socket.handshake.headers.user, { access: "chat", parametr: "active" }, db)
            if (checkResult) {
                return;
            }
        }
        try{
            await Message.updateMany({ client: user, isIncoming: true }, { new: false });
            let messages = await Message.find({ client: user }).sort({ $natural: -1 }).limit(50);
            io.to(socket.id).emit("all messages", messages)
        }catch(e){
            console.log(e,"getMessages---------------------------------------------------");
        }
        
        
        
    }

    sendNewsNotification = async function (io, socket, id) {
        let db = useDB(socket.handshake.headers.db)
        let News = db.model("News");
        let data = await News.findById(id)
        
        if(data){
            socket.to(socket.handshake.headers.mainRoom).emit("server news notification", data)
        }
    }
    sendHey = async function (io) {
        io.to('kaarov888@gmail.com').emit('sendingHey', {msg: 'sendingHey AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.'});
    }
}
module.exports = new SocketController();

