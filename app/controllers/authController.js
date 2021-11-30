var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config/config');
const { sendError, randomNumber, randomPassword, createQrFile, useDB } = require('../../services/helper')
var validate = require('../../config/messages');
var axios = require('axios');
const { response } = require('express');
var queryString = require('query-string');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'helpLoygift@gmail.com',
        pass: 'helpLoygift321',
    },
});

async function addWelcomePoints(db) {
    let cashback_model = db.model("Cashback");
    let cashbackAll = await cashback_model.find();
    let points = 0;
    if(cashbackAll.length===0){
        return 0;
    }
    try{
        let cashback = cashbackAll[0];
        //check welcome points
        if(cashback.welcome_points_status){
            points = cashback.welcome_points_quant;
        }
    }catch (e){
        console.log(e);
    }
    return parseFloat(points);
}

class AuthController{
    register = async function (req, res) {
        let db = useDB('loygift');
        let User = db.model("User");
        let catalogs_model = db.model("catalogs");
        let result = [];
        try {
            let hashedPassword = bcrypt.hashSync(req.fields.password, 8);
            let user = new User({
                name: req.fields.name,
                phone: req.fields.phone,
                email: req.fields.email,
                password: hashedPassword,
                companyName: req.fields.companyName,
                rate: req.fields.rate,
            });
            await user.validate();
            user._db = 'loygift' + user._id;
            await user.save();
            //////
            await new catalogs_model({
                company: user._id,
            }).save();
            //////
            user.password = "";
            result = {
                'status': 200,
                'msg': 'User added',
                'auth': true,
                'object': user,
                'refresh_token': jwt.sign({ id: user._id, user: user._id, name: user.name, type: "admin" }, config.secret_key, {
                    expiresIn: "60 days"
                }),
                'token': jwt.sign({ id: user._id, user: user._id, name: user.name, type: "admin"  }, config.secret_key, {
                    expiresIn: "30 days" // expires in 24 hours
                }),
            }
        } catch (error) {
            result = sendError(error, req.headers["accept-language"]);
        }
        res.status(result.status).json(result);
    };

    login = async function (req, res) {
        let db = useDB('loygift');
        let User = db.model("User");
        let result = []
        try {
            let user = await User.findOne({ email: req.fields.email }).select('+password +DB')
            if (!user) return res.status(404).json({ status: 404, msg: 'No user found' });

            var passwordIsValid = bcrypt.compareSync(req.fields.password, user.password);
            if (!passwordIsValid) return res.status(401).json({ auth: false, token: null });

            var token = jwt.sign({ id: user._id, user: user._id, name: user.name, type: "admin" }, config.secret_key, {
                expiresIn: "30 days" // expires in 24 hours
            });
            var refresh_token = jwt.sign({ id: user._id, user: user._id, name: user.name, type: "admin" }, config.secret_key, {
                expiresIn: "60 days"
            });
            user.password = ""
            res.status(200).json({ auth: true, token: token, refresh_token: refresh_token, object: user });
        } catch (error) {
            let result = sendError(error, req.headers["accept-language"])
            res.status(result.status).json(result);
        }
    };
    
    loginEmployee = async function (req, res) {
        let filter = {
            email: req.fields.email,
        }

        let db = useDB('loygift' + req.headers['access-place']);
        let Employee = db.model("Employee");
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        try {
            let user = await Employee.findOne(filter).select('+password')
            if(user.isBlocked){
                return res.status(400).json({ status: 400, msg: 'Your account has been blocked' });
            }
            
            let errors = {
                email: validate[lang]['user_not_found'],
                password: validate[lang]['password_wrong']
            }

            if (!user) return res.status(400).json({ status: 404, msg: 'No user found', errors: errors });

            var passwordIsValid = bcrypt.compareSync(req.fields.password, user.password);
            delete errors.phone
            if (!passwordIsValid) return res.status(401).json({ status: 401, msg: "Not valid password", auth: false, token: null, errors: errors });

            var token = jwt.sign({ id: req.headers['access-place'], user: user._id, name: user.name, type: "employee" }, config.secret_key, {
                expiresIn: 86400 // expires in 24 hours
            });
            var refresh_token = jwt.sign({ id: req.headers['access-place'], user: user._id, name: user.name, type: "employee" }, config.secret_key, {
                expiresIn: "30 days"
            });
            user.password = ""
            res.status(200).json({ status: 200, auth: true, msg: "Sending token", token: token, refresh_token: refresh_token, object: user });
        } catch (error) {
            let result = sendError(error, req.headers["accept-language"])
            res.status(result.status).json(result);
        }
    };
    loginClient = async function (req, res) {
        let log_field = 'phone';
        let filter = {
            phone: req.fields.phone,
        }
        if(!req.fields.phone){
            filter={
                email: req.fields.email,
            }
        }

        let db = useDB('loygift'+req.headers['access-place']);
        let Client = db.model("Client");
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        
        try {
            let user = await Client.findOne(filter).populate("news").select('+password')

            let errors = {
                phone: validate[lang]['user_not_found'],
                password: validate[lang]['password_wrong']
            }

            if (!user) return res.status(404).json({ status: 404, msg: 'No user found', errors: errors});
            if (!user.password) return res.status(401).json({ status: 401, msg: "Not valid password", auth: false, token: null, errors: errors });
            var passwordIsValid = bcrypt.compareSync(req.fields.password, user.password);
            delete errors.phone
            if (!passwordIsValid) return res.status(401).json({ status: 401, msg: "Not valid password", auth: false, token: null, errors: errors });

            var token = jwt.sign({ id: req.headers['access-place'], user: user._id, name: user.name, type: "client"  }, config.secret_key, {
                expiresIn: 86400 // expires in 24 hours
            });
            var refresh_token = jwt.sign({ id: req.headers['access-place'], user: user._id, name: user.name, type: "client"   }, config.secret_key, {
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
        let db = useDB('loygift'+req.headers['access-place']);
        let Client = db.model("Client");
        let ClientBonusHistory = db.model("clientBonusHistory");
        let result = []
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        try {
            let hashedPassword = bcrypt.hashSync(req.fields.password, 8);
            let number = randomNumber(100000, 1000000)
            // let number = 1000001
            let qrCode = createQrFile(number.toString(), 'loygift' + req.headers['access-place'])
            var client = new Client({
                name: req.fields.name,
                phone: req.fields.phone,
                email: req.fields.email,
                password: req.fields.password,
                custom_field_0: req.fields.custom_field_0,
                custom_field_1: req.fields.custom_field_1,
                custom_field_2: req.fields.custom_field_2,
                uniqueCode: number.toString(),
                QRCode: qrCode
            })
            await client.validate()
            client.password = hashedPassword;
            //cashback
            let cashback_points = await addWelcomePoints(db);
            if(cashback_points>0){
                client.points = parseFloat(client.points ) + cashback_points;
                await new ClientBonusHistory({
                    client: client._id,
                    points: cashback_points,
                    source: 'Welcome points',
                    type: 'received',
                }).save();
            }

            await client.save();
            client.password = ""
            result = {
                'status': 200,
                'msg': 'Client added',
                'auth': true,
                'object': client,
                'refresh_token': jwt.sign({ id: req.headers['access-place'], user: client._id, name: client.name, type: "client"  }, config.secret_key, {
                    expiresIn: "30 days"
                }),
                'token': jwt.sign({ id: req.headers['access-place'], user: client._id, name: client.name, type: "client" }, config.secret_key, {
                    expiresIn: 86400 // expires in 24 hours
                }),
            }

        } catch (error) {
            result = sendError(error, lang)
        }
        res.status(result.status).json(result);
    };

    registerClientSocial = async function (req, res) {
        let db = useDB('loygift' + req.headers['access-place']);
        let Client = db.model("Client");
        let ClientBonusHistory = db.model("clientBonusHistory");
        let result = []
        let social_res = []
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        socialAuth: try {
            social_res = await socialRegister(req.fields.social, req.fields.token, req.fields.screen_name, req.fields.full_name, req.fields.email)

            if (social_res.error) {
                result = social_res.error
                break socialAuth
            }
            let user = await Client.findOne(social_res.check).populate("news")
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
            social_res.uniqueCode = randomNumber(100000, 1000000)
            var client = new Client(social_res.save)
            let qrCode = createQrFile(social_res.uniqueCode, 'loygift' + req.headers['access-place'])
            client.QRCode = qrCode
            client.uniqueCode = social_res.uniqueCode

            //cashback
            let cashback_points = await addWelcomePoints(db);
            if(cashback_points>0){
                client.points = parseFloat(client.points ) + cashback_points;
                await new ClientBonusHistory({
                    client: client._id,
                    points: cashback_points,
                    source: 'Welcome points',
                    type: 'received',
                }).save();
            }

            await client.save({ validateBeforeSave: false })
            result = {
                'status': 200,
                'msg': 'Client added',
                'auth': true,
                'object': client,
                'refresh_token': jwt.sign({ id: req.headers['access-place'], user: client._id, name: client.name, type: "client"  }, config.secret_key, {
                    expiresIn: "30 days"
                }),
                'token': jwt.sign({ id: req.headers['access-place'], user: client._id, name: client.name, type: "client" }, config.secret_key, {
                    expiresIn: 86400 // expires in 24 hours
                }),
            }

        } catch (error) {

            result = sendError(error, lang)
        }
        res.status(result.status).json(result);
    };
    loginClientSocial = async function (req, res) {
        let db = useDB('loygift' + req.headers['access-place']);
        let Client = db.model("Client");
        let result = []
        let social_res = []
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        socialAuth: try {
            let social_res = await socialRegister(req.fields.social, req.fields.token, req.fields.screen_name, req.fields.full_name, req.fields.email)

            if (social_res.error) {
                result = social_res.error
                break socialAuth
            }
            let client = await Client.findOne(social_res.check).populate("news")
            
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
                'refresh_token': jwt.sign({ id: req.headers['access-place'], user: client._id, name: client.name, type: "client"  }, config.secret_key, {
                    expiresIn: "30 days"
                }),
                'token': jwt.sign({ id: req.headers['access-place'], user: client._id, name: client.name, type: "client" }, config.secret_key, {
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
            let result = {
                'status': 200,
                'msg': 'Sending token',
                'auth': true,
                'refresh_token': jwt.sign({ id: decoded.id, user: decoded.user, name: decoded.name, type: decoded.type  }, config.secret_key, {
                    expiresIn: "30 days"
                }),
                'token': jwt.sign({ id: decoded.id, user: decoded.user, name: decoded.name, type: decoded.type }, config.secret_key, {
                    expiresIn: 86400 // expires in 24 hours
                }),
            }
            res.status(result.status).json(result);
        });
        
    };
    logout = async function (req, res) {
        res.status(200).json({ auth: false, token: null });
    };

    resetPasswordMessage = async function (req, res) {
        let db = useDB('loygift' + req.headers['access-place']);
        let Client = db.model("Client");
        let result = []
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        resetPassword: try {
            if (!req.headers['access-place']) {
                result = {
                    status: 500,
                    msg: "Wrong query",
                }
                break resetPassword
            }
            let client = await Client.findOne({"email": req.fields.email})

            if (!client) {
                result = {
                    status: 500,
                    msg: "Validation error",
                    errors: {
                        user: validate[lang]['user_not_found'],
                    }
                }
                break resetPassword
            }
            let code = randomNumber(100000, 1000000)
            client.oneTimeCode = code
            await client.save({validateBeforeSave: false})
            transporter.sendMail({
                from: 'loygift', // sender address
                to: req.fields.email, // list of receivers
                subject: "New password", // Subject line
                html: "<b> code: " + code + " </b>", // html body
            }).catch(console.error);

            result = {
                'status': 200,
                'msg': 'Sending token',
            }

        } catch (error) {

            result = sendError(error, lang)
        }

        res.status(result.status).json(result);
    };

    resetCheckCode = async function (req, res) {
        let db = useDB('loygift' + req.headers['access-place']);
        let Client = db.model("Client");
        let result = []
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        resetPassword: try {
            if (!req.headers['access-place']) {
                result = {
                    status: 500,
                    msg: "Wrong query",
                }
                break resetPassword
            }
            let client = await Client.findOne({ "email": req.fields.email })

            if (!client) {
                result = {
                    status: 500,
                    msg: "Validation error",
                    errors: {
                        user: validate[lang]['user_not_found'],
                    }
                }
                break resetPassword
            }
            if (client.oneTimeCode && client.oneTimeCode == req.fields.code) {
                result = {
                    'status': 200,
                    'msg': 'Code math',
                }
            }else{
                result = {
                    status: 500,
                    msg: "Validation error",
                    errors: {
                        code: validate[lang]['code_invalid'],
                    }
                }
                break resetPassword
            }
        } catch (error) {

            result = sendError(error, lang)
        }
        res.status(result.status).json(result);
    };
    resetPassword = async function (req, res) {
        let db = useDB('loygift' + req.headers['access-place']);

        let Client = db.model("Client");
        let result = []
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        resetPassword: try {
            if (!req.headers['access-place']){
                result = {
                    status: 500,
                    msg: "Wrong query",
                }
                break resetPassword
            }
            let client = await Client.findOne({ "email": req.fields.email }).select("+password")

            if (!client) {
                result = {
                    status: 500,
                    msg: "Validation error",
                    errors: {
                        user: validate[lang]['user_not_found'],
                    }
                }
                break resetPassword
            }

            if (client.oneTimeCode &&  client.oneTimeCode == req.fields.code){

                if (req.fields.password && req.fields.password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/) && req.fields.password.length < 64){
                    client.password = bcrypt.hashSync(req.fields.password, 8);
                    client.oneTimeCode = ""
                    await client.save({validateBeforeSave:false})
                    client.password = "secured"
                    result = {
                        'status': 200,
                        'msg': 'Sending token',
                        'auth': true,
                        'object': client,
                        'refresh_token': jwt.sign({ id: req.headers['access-place'], user: client._id, name: client.name, type: "client" }, config.secret_key, {
                            expiresIn: "30 days"
                        }),
                        'token': jwt.sign({ id: req.headers['access-place'], user: client._id, name: client.name, type: "client" }, config.secret_key, {
                            expiresIn: 86400 // expires in 24 hours
                        }),
                    }
                }else{
                    let message = "password_valid"
                    if (req.fields.password.length < 8) {
                        message = "password_min"
                    } else if (req.fields.password.length > 64) {
                        message = "password_max"
                    }
                    result = {
                        status: 500,
                        msg: "Validation error",
                        errors: {
                            password: validate[lang][message],
                        }
                    }
                    break resetPassword
                }

            }else{
                result = {
                    status: 500,
                    msg: "Validation error",
                    errors: {
                        code: validate[lang]['code_invalid'],
                    }
                }
                break resetPassword
            }


        } catch (error) {

            result = sendError(error, lang)
        }
        res.status(result.status).json(result);
    };

    callbackFB = async function (req, res) {
        // var token = req.user.jwtoken;
        var fb_token = req.authInfo;
        res.cookie('auth', fb_token);
        // let result = await registerClientSocialWeb ("facebook", fb_token,"en","602e5015622e3235df995cbe");
        let result = await loginClientSocialWeb ("facebook", fb_token,"en","602e5015622e3235df995cbe");
        res.redirect('/');
    };
    callbackGG = async function (req, res) {
        var gg_token = req.authInfo;
        res.cookie('auth', gg_token);
        let result = await loginClientSocialWeb ("google", gg_token,"en","602e5015622e3235df995cbe");
        res.redirect('/');
    };
    callbackTW = async function (req, res) {
        let tw_token = req.authInfo;
        let screen_name = req.user.username;
        res.cookie('auth', tw_token);
        let result = await registerClientSocialWeb ("twitter", tw_token,"en","602e5015622e3235df995cbe",screen_name);
        
        res.redirect('/');
    };
}
async function socialRegister(type, token, screen_name="", full_name="", email="",google_id=""){
    let response = []
    if (type == "facebook") {
        response = await fbRegister(token)
    } else if (type == "twitter") {
        response = await twitterRegister(token, screen_name)
    } else if (type == "google") {
        response = await googleRegister(token)
    } else if (type == "apple") {
        response = await appleRegister(token, screen_name, full_name, email)
    } else if (type == "android"){
        let save = {
            name: full_name,
            email: email,
            google_id: google_id,
        }
        response = {
            check: {email:email},
            save: save
        }
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
    let check = { fb_id: fb_response.data.id }
    if (fb_response.data.email) {
        check = { $or: [{ fb_id: fb_response.data.id }, { email: fb_response.data.email }] }
    }
    let rand_name = "guest" + randomNumber(100000, 1000000)
    let full_name = fb_response.data.first_name + ' ' + fb_response.data.last_name
    let save = {
        name: full_name || rand_name,
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
async function twitterRegister(token, screen_name) {
    let consumer_key = "S0KIiVOhHcWIJtVBaL99aIZKg"
    let consumer_secret = "Kk3MKRfnB6OhBNAtn6W2C08bS3Md1QkYTnyKtdQ37Vn3t2BIdA"
    let base64 = Buffer.from(consumer_key + ':' + consumer_secret).toString('base64')

    let response = await axios({
        url: 'https://api.twitter.com/oauth2/token',
        method: 'post',
        headers:{
            Authorization: "Basic " + base64
        },
        params:{
            grant_type:"client_credentials"
        }


    }).catch(error => {
        let result = {
            status: 500,
            msg: "Token is not valid",
            errors: {
                token: "Token is not valid",
            }
        }
        return { error: result }
    })
    let access_token = response.data.access_token
    response = await axios({
        url: 'https://api.twitter.com/1.1/users/show.json?screen_name=' + screen_name,
        method: 'get',
        headers: {
            Authorization: "Bearer " + access_token
        },
        params: {
            grant_type: "client_credentials"
        }
    }).catch(error => {
        let result = {
            status: 500,
            msg: "Token is not valid",
            errors: {
                token: "Token is not valid",
            }
        }
        return { error: result }
    })
    if (response.error) {
        return response
    }
    let check = { twitter_id: response.data.id }
    if (response.data.email){
        check = { $or: [{ twitter_id: response.data.id }, { email: response.data.email }] }
    }

    let save = {
        name: response.data.name,
        email: response.data.email,
        birthDate: response.data.birthday,
        gender: response.data.gender,
        twitter_id: response.data.id,
    }
    let result = {
        check: check,
        save: save
    }
    return result
}
async function appleRegister(token, screen_name, full_name, email) {
    
    let check = { apple_id: screen_name,  }
    if (email) {
        check = { $or: [{ apple_id: screen_name }, { email: email }] }
    }
    let rand_name = "guest" + randomNumber(100000, 1000000)
    let save = {
        name: full_name || rand_name,
        email: email,
        apple_id: screen_name,
    }
    let result = {
        check: check,
        save: save
    }
    return result
}
async function googleRegister(token) {
    let response = await axios({
        url: 'https://www.googleapis.com/oauth2/v3/tokeninfo',
        // url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        method: 'get',
        params: {
            id_token: token,
            // access_token: token
        }
    }).catch(error => {
        let result = {
            status: 500,
            msg: "Token is not valid",
            errors: {
                token: "Token is not valid",
            }
        }
        return { error: result }
    })
    if (response.error) {
        return response
    }
    let check = { google_id: response.data.sub }
    if (response.data.email) {
        check = { $or: [{ google_id: response.data.sub }, { email: response.data.email }] }
    }
    let rand_name = "guest" + randomNumber(100000, 1000000)
    let save = {
        name: response.data.name || rand_name,
        email: response.data.email,
        google_id: response.data.sub,
    }
    let result = {
        check: check,
        save: save
    }
    return result
}
async function registerClientSocialWeb (type,token,lang,access_place,screen_name="") {
    let db = useDB('loygift' + access_place);
    let Client = db.model("Client");
    let result = []
    if (lang != 'ru') {
        lang = 'en'
    }

    socialAuth: try {
        let social_res = await socialRegister(type, token,screen_name)

        if (social_res.error) {
            result = social_res.error
            break socialAuth
        }
        let user = await Client.findOne(social_res.check)
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
        var client = new Client(social_res.save)
        await client.save({ validateBeforeSave: false })
        result = {
            'status': 200,
            'msg': 'Client added',
            'auth': true,
            'object': client,
            'refresh_token': jwt.sign({ id: access_place }, config.secret_key, {
                expiresIn: "30 days"
            }),
            'token': jwt.sign({ id: access_place }, config.secret_key, {
                expiresIn: 86400 // expires in 24 hours
            }),
        }

    } catch (error) {

        result = sendError(error, lang)
    }
    return result;
};

async function loginClientSocialWeb (type,token,lang,access_place,screen_name="") {
    let db = useDB('loygift' + access_place);
    let Client = db.model("Client");
    let result = []
    if (lang != 'ru') {
        lang = 'en'
    }
    socialAuth: try {
        let social_res = await socialRegister(type, token,screen_name)

        if (social_res.error) {
            result = social_res.error
            break socialAuth
        }
        let client = await Client.findOne(social_res.check)

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
            'refresh_token': jwt.sign({ id: access_place }, config.secret_key, {
                expiresIn: "30 days"
            }),
            'token': jwt.sign({ id: access_place }, config.secret_key, {
                expiresIn: 86400 // expires in 24 hours
            }),
        }

    } catch (error) {

        result = sendError(error, lang)
    }
    return result;
};

module.exports = new AuthController();
