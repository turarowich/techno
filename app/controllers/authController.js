var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config/config');
const { sendError } = require('../../services/helper')
var validate = require('../../config/errorMessages');
class AuthController{
    register = async function (req, res) {
        let db = global.userConnection.useDb('loygift');
        let User = db.model("User");
        try {
            let hashedPassword = bcrypt.hashSync(req.fields.password, 8);
            let user = new User({
                name: req.fields.name,
                phone: req.fields.phone,
                email: req.fields.email,
                password: hashedPassword,
                companyName: req.fields.companyName,
                description: req.fields.description,
                rate: req.fields.rate,
            })
            await user.validate()
            user._db = 'loygift' + user._id
            user.save()
            user.password = ""
            let result = {
                'status': 200,
                'msg': 'User added',
                'auth': true,
                'object': user,
                'refresh_token': jwt.sign({ id: user._id }, config.secret_key, {
                    expiresIn: "30 days"
                }),
                'token': jwt.sign({ id: user._id }, config.secret_key, {
                    expiresIn: 86400 // expires in 24 hours
                }),
            }
            res.status(result.status).json(result);
        } catch (error) {
            let result = sendError(error, req.headers["accept-language"])
            res.status(result.status).json(result);
        }
    };

    login = async function (req, res) {
        console.log(req.fields)
        let db = global.userConnection.useDb('loygift');
        let User = db.model("User");

        try {
            let user = await User.findOne({ email: req.fields.email }).select('+password +DB')
            if (!user) return res.status(404).json({ status: 404, msg: 'No user found' });

            var passwordIsValid = bcrypt.compareSync(req.fields.password, user.password);
            if (!passwordIsValid) return res.status(401).json({ auth: false, token: null });

            var token = jwt.sign({ id: user._id}, config.secret_key, {
                expiresIn: 86400 // expires in 24 hours
            });
            var refresh_token = jwt.sign({ id: user._id }, config.secret_key, {
                expiresIn: "30 days"
            });
            user.password = ""
            res.status(200).json({ auth: true, token: token, refresh_token: refresh_token, object: user });
        } catch (error) {
            let result = sendError(error, req.headers["accept-language"])
            res.status(result.status).json(result);
        }
    };

    loginClient = async function (req, res) {
        let db = global.userConnection.useDb(req.headers['access_place']);
        let Client = db.model("Client");
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }

        try {
            let user = await Client.findOne({ phone: req.fields.phone }).select('+password')
            let errors = {
                phone: validate[lang]['user_not_found'],
                password: validate[lang]['password_wrong']
            }

            if (!user) return res.status(404).json({ status: 404, msg: 'No user found', errors: errors});

            var passwordIsValid = bcrypt.compareSync(req.fields.password, user.password);
            delete errors.phone
            if (!passwordIsValid) return res.status(401).json({ status: 401, msg: "Not valid password", auth: false, token: null, errors: errors });

            var token = jwt.sign({ id: user._id }, config.secret_key, {
                expiresIn: 86400 // expires in 24 hours
            });
            var refresh_token = jwt.sign({ id: user._id }, config.secret_key, {
                expiresIn: "30 days"
            });
            user.password = ""
            res.status(200).json({status: 200, auth: true, msg: "Sending token", token: token, refresh_token: refresh_token, object: user });
        } catch (error) {
            let result = sendError(error, req.headers["accept-language"])
            res.status(result.status).json(result);
        }
    };
    registerClient = async function (req, res) {
        let db = global.userConnection.useDb(req.headers['access_place']);
        let Client = db.model("Client");
        try {
            console.log(req.fields)
            let hashedPassword = bcrypt.hashSync(req.fields.password, 8);
            var client = new Client({
                name: req.fields.name,
                phone: req.fields.phone,
                email: req.fields.email,
                password: req.fields.password
            })
            await client.validate()
            client.password = hashedPassword
            await client.save()
            client.password = ""
            let result = {
                'status': 200,
                'msg': 'Client added',
                'auth': true,
                'object': client,
                'refresh_token': jwt.sign({ id: client._id }, config.secret_key, {
                    expiresIn: "30 days"
                }),
                'token': jwt.sign({ id: client._id }, config.secret_key, {
                    expiresIn: 86400 // expires in 24 hours
                }),
            }
            res.status(result.status).json(result);
        } catch (error) {
            let result = sendError(error, req.headers["accept-language"])
           res.status(result.status).json(result);
        }
        
    };

    logout = async function (req, res) {
        res.status(200).json({ auth: false, token: null });
    };
    
}

module.exports = new AuthController();
