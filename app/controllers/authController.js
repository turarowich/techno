var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config/config');
const { sendError } = require('../../services/helper')
var validate = require('../../config/errorMessages');
var axios = require('axios');
const { response } = require('express');
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;
var queryString = require('query-string')
class AuthController{
    register = async function (req, res) {
        let db = global.userConnection.useDb('loygift');
        let User = db.model("User");
        let result = []
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
            result = {
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
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };

    login = async function (req, res) {
        console.log(req.fields)
        let db = global.userConnection.useDb('loygift');
        let User = db.model("User");
        let result = []
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
        console.log('loygift' + req.headers['access_place'])
        let db = global.userConnection.useDb('loygift'+req.headers['access_place']);
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

            var token = jwt.sign({ id: req.headers['access_place'] }, config.secret_key, {
                expiresIn: 86400 // expires in 24 hours
            });
            var refresh_token = jwt.sign({ id: req.headers['access_place'] }, config.secret_key, {
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
        let db = global.userConnection.useDb('loygift'+req.headers['access_place']);
        let Client = db.model("Client");
        let result = []
        try {
            console.log(req.fields)
            let hashedPassword = bcrypt.hashSync(req.fields.password, 8);
            var client = new Client({
                name: req.fields.name,
                phone: req.fields.phone,
                email: req.fields.email,
                password: req.fields.password,
            })
            await client.validate()
            client.password = hashedPassword
            await client.save()
            client.password = ""
            result = {
                'status': 200,
                'msg': 'Client added',
                'auth': true,
                'object': client,
                'refresh_token': jwt.sign({ id: req.headers['access_place'] }, config.secret_key, {
                    expiresIn: "30 days"
                }),
                'token': jwt.sign({ id: req.headers['access_place'] }, config.secret_key, {
                    expiresIn: 86400 // expires in 24 hours
                }),
            }
            
        } catch (error) {
            let result = sendError(error, req.headers["accept-language"])
        }
        res.status(result.status).json(result);
    };

    registerClientSocial = async function (req, res) {
        let db = global.userConnection.useDb('loygift' + req.headers['access_place']);
        let Client = db.model("Client");
        let result = []
        let social_res = []
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }

        socialAuth: try {
            let check = { fb_id: req.fields.fb_id }
            if(!check.fb_id){
                check = { twitter_id: req.fields.twitter_id }
                if (!check.twitter_id) {
                    check = { google_id: req.fields.google_id }
                }
            }
            
            let user = await Client.findOne(check)
            if(user){
                result = {
                    status: 500,
                    msg: "Validation error",
                    errors: {
                        user: validate[lang]['user_exist'],
                    },
                    client_title: validate[lang]['client_user_exist_title'],
                    client_msg: validate[lang]['client_user_exist_msg']
                }
                break socialAuth
            }
            check.name = req.fields.name
            check.email = req.fields.email
            check.birthDate = req.fields.birthday
            check.gender = req.fields.gender
            var client = new Client(check)
            await client.save({ validateBeforeSave: false })
            result = {
                'status': 200,
                'msg': 'Client added',
                'auth': true,
                'object': client,
                'refresh_token': jwt.sign({ id: req.headers['access_place'] }, config.secret_key, {
                    expiresIn: "30 days"
                }),
                'token': jwt.sign({ id: req.headers['access_place'] }, config.secret_key, {
                    expiresIn: 86400 // expires in 24 hours
                }),
            }

        } catch (error) {

            result = sendError(error, lang)
        }
        res.status(result.status).json(result);
    };
    loginClientSocial = async function (req, res) {
        let db = global.userConnection.useDb('loygift' + req.headers['access_place']);
        let Client = db.model("Client");
        let result = []
        let social_res = []
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        socialAuth: try {
            let check = { fb_id: req.fields.fb_id }
            if (!check.fb_id) {
                check = { twitter_id: req.fields.twitter_id }
                if (!check.twitter_id) {
                    check = { google_id: req.fields.google_id }
                }
            }
            let client = await Client.findOne(check)
            
            if (!client) {
                result = {
                    status: 500,
                    msg: "Validation error",
                    errors: {
                        user: validate[lang]['user_not_found'],
                    },
                    client_title: validate[lang]['client_user_not_found_title'],
                    client_msg: validate[lang]['client_user_not_found_msg']
                }
                break socialAuth
            }
            result = {
                'status': 200,
                'msg': 'Sending token',
                'auth': true,
                'object': client,
                'refresh_token': jwt.sign({ id: req.headers['access_place'] }, config.secret_key, {
                    expiresIn: "30 days"
                }),
                'token': jwt.sign({ id: req.headers['access_place'] }, config.secret_key, {
                    expiresIn: 86400 // expires in 24 hours
                }),
            }

        } catch (error) {

            result = sendError(error, lang)
        }
        res.status(result.status).json(result);
    };
    
    refreshToken = async function (req, res) {
        // Header names in Express are auto-converted to lowercase
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        // Remove Bearer from string
        token = token.replace(/^Bearer\s+/, "");

        if (!token)
            return res.status(403).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, config.secret_key, function (err, decoded) {
            if (err)
                return res.status(200).send({status:200, auth: false, message: 'Failed to authenticate token.' });
            console.log(decoded)
            let result = {
                'status': 200,
                'msg': 'Sending token',
                'auth': true,
                'refresh_token': jwt.sign({ id: decoded.id }, config.secret_key, {
                    expiresIn: "30 days"
                }),
                'token': jwt.sign({ id: decoded.id }, config.secret_key, {
                    expiresIn: 86400 // expires in 24 hours
                }),
            }
            res.status(result.status).json(result);
        });
        
    };
    logout = async function (req, res) {
        res.status(200).json({ auth: false, token: null });
    };

    callbackFB = async function (req, res) {
        var token = req.user.jwtoken;
        res.cookie('auth', token);
        res.redirect('/');
    };
    
}
async function socialRegister(type, token){
    let response = []
    if (type == "facebook") {
        response = await fbRegister(token)
    } else if (type == "twitter") {
        response = await twitterRegister(token)
    } else if (type == "google") {
        response = await googleRegister(token)
    }
    return response
} 
async function fbRegister(token){
    let fb_response = await axios({
        url: 'https://graph.facebook.com/me',
        method: 'get',
        params: {
            fields: ['id', 'email', 'first_name', 'last_name', 'gender', 'birthday', 'picture'].join(','),
            access_token: token,
        },
    }).catch( error => {
        let result = {
            status: 500,
            msg: "Token is not valid",
            errors: {
                token: "Token is not valid",
            }
        }
        return {error: result}
    })
    if(fb_response.error){
        return fb_response
    }

    let check = { $or: [{ fb_id: fb_response.data.id }, { email: fb_response.data.email }] }
    let save = {
        name: fb_response.data.first_name + ' ' + fb_response.data.last_name,
        email: fb_response.data.email,
        birthDate: fb_response.data.birthday,
        gender: fb_response.data.gender,
        fb_id: fb_response.data.id,
    }
    let result = {
        check: check,
        save: save
    }
    return result
}
function twitterRegister(token) {
    // let fb_response = await axios({
    //     url: 'https://graph.facebook.com/me',
    //     method: 'get',
    //     params: {
    //         fields: ['id', 'email', 'first_name', 'last_name', 'gender', 'birthday', 'picture'].join(','),
    //         access_token: token,
    //     },
    // })

    let fb_response = {
        data: {
            id: '259053925911615',
            first_name: 'Али',
            last_name: 'Кааров',
            gender: 'male',
            birthday: '02/01/1993',
            email: "kaarov8232@gmail.com",
            picture: {
                data: {
                    height: 50,
                    is_silhouette: true,
                    url: 'https://scontent.ffru7-1.fna.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=12b3be&_nc_ohc=BnyBL7OgTNQAX938V_m&_nc_ht=scontent.ffru7-1.fna&tp=27&oh=f83ac1aba00c0d3d43285c0a0f8719db&oe=60A5E538',
                    width: 50
                }
            }
        }
    }
    let check = { $or: [{ fb_id: fb_response.data.id }, { email: fb_response.data.email }] }
    let save = {
        name: fb_response.data.first_name + ' ' + fb_response.data.last_name,
        email: fb_response.data.email,
        birthDate: fb_response.data.birthday,
        gender: fb_response.data.gender,
        fb_id: fb_response.data.id,
    }
    let result = {
        check: check,
        save: save
    }
    return result
}
function googleRegister(token) {
    // let fb_response = await axios({
    //     url: 'https://graph.facebook.com/me',
    //     method: 'get',
    //     params: {
    //         fields: ['id', 'email', 'first_name', 'last_name', 'gender', 'birthday', 'picture'].join(','),
    //         access_token: token,
    //     },
    // })

    let fb_response = {
        data: {
            id: '259053925911615',
            first_name: 'Али',
            last_name: 'Кааров',
            gender: 'male',
            birthday: '02/01/1993',
            email: "kaarov8232@gmail.com",
            picture: {
                data: {
                    height: 50,
                    is_silhouette: true,
                    url: 'https://scontent.ffru7-1.fna.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=12b3be&_nc_ohc=BnyBL7OgTNQAX938V_m&_nc_ht=scontent.ffru7-1.fna&tp=27&oh=f83ac1aba00c0d3d43285c0a0f8719db&oe=60A5E538',
                    width: 50
                }
            }
        }
    }
    let check = { $or: [{ fb_id: fb_response.data.id }, { email: fb_response.data.email }] }
    let save = {
        name: fb_response.data.first_name + ' ' + fb_response.data.last_name,
        email: fb_response.data.email,
        birthDate: fb_response.data.birthday,
        gender: fb_response.data.gender,
        fb_id: fb_response.data.id,
    }
    let result = {
        check: check,
        save: save
    }
    return result
}
module.exports = new AuthController();
