const db = global.userConnection.useDb("loygift");
const User = db.model("User");
const { useDB, sendError} = require('../../services/helper')
var validate = require('../../config/messages');
class UserController{
    
    getUser = async function (req, res) {
        let result = {
            'status': 200,
            'msg': 'Sending user'
        }
        try {
            let user = await User.findById(req.params.user)
            result['object'] = user
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    getUsers = async function (req, res) {
        let result = {
            'status': 200,
            'msg': 'Sending users'
        }
        try {
            let user = await User.find()
            result['objects'] = user
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
    updateUser = async function (req, res) {
        let result = {
            'status': 200,
            'msg': 'User updated'
        }
        try {
            let query = { '_id': req.params.user }
            req.fields['updatedAt'] = new Date()
            let user = await User.findOneAndUpdate(query, req.fields)
            result['object'] = user
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    deleteUser = async function (req, res) {
        let result = {
            'status': 200,
            'msg': 'User deleted'
        }
        try {
            let query = { '_id': req.params.user }
            await User.findByIdAndRemove(query)
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
}


module.exports = new UserController();
