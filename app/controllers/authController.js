var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config/config');

class AuthController{
    register = async function (req, res) {
        let db = global.userConnection.useDb('loygift');
        let User = db.model("User");
        let result = {
            'status': 200,
            'msg': 'User added'
        }
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
            let token = jwt.sign({ id: user._id, db: user._db }, config.secret_key, {
                expiresIn: 86400 // expires in 24 hours
            });
            result['auth'] = true
            result['token'] = token

        } catch (error) {
            console.log(error)
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };

    login = async function (req, res) {
        let db = global.userConnection.useDb('loygift');
        let User = db.model("User");

        try {
            let user = await User.findOne({ email: req.fields.email }).select('+password +DB')
            if (!user) return res.status(404).json({ status: 404, msg: 'No user found' });

            var passwordIsValid = bcrypt.compareSync(req.fields.password, user.password);
            if (!passwordIsValid) return res.status(401).json({ auth: false, token: null });

            var token = jwt.sign({ id: user._id, db: user._db }, config.secret_key, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({ auth: true, token: token });
        } catch (error) {
            let result = {
                'status': 500,
                'msg': error.message
            }
            res.status(200).json(result);
        }
    };

    loginClient = async function (req, res) {
        let db = global.userConnection.useDb(req.headers['access_place']);
        let Client = db.model("Client");

        try {
            let user = await Client.findOne({ email: req.fields.email }).select('+password')
            if (!user) return res.status(404).json({ status: 404, msg: 'No user found' });

            var passwordIsValid = bcrypt.compareSync(req.fields.password, user.password);
            if (!passwordIsValid) return res.status(401).json({ auth: false, token: null });

            var token = jwt.sign({ id: user._id }, config.secret_key, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({ auth: true, token: token });
        } catch (error) {
            let result = {
                'status': 500,
                'msg': error.message
            }
            res.status(200).json(result);
        }
    };

    logout = async function (req, res) {
        res.status(200).json({ auth: false, token: null });
    };
}

module.exports = new AuthController();
