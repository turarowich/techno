var jwt = require('jsonwebtoken');
var config = require('../config/config');
function verifyToken(req, res, next) {

    // Header names in Express are auto-converted to lowercase
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    let validWithoutToken = ['/searchPromocodeByCodeApi','/getSettings','/getProducts', '/getNews', '/getCategories?type=product', '/getCategories']
    let url = '/'+req.path.split('/')[1]

    console.log("verifyToken",url,`Token:${token}`,`Access: ${req.headers['access-place']}`)
    console.log("-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|")
    if (!token || token.includes('null')){
        console.log("No token")
        if (req.headers['access-place'] && validWithoutToken.includes(url)){
            req.db = 'loygift' + req.headers['access-place']
            return next();
        }
        return res.status(403).send({ auth: false, message: 'No token provided.45' });
    }else{
        // Remove Bearer from string
        console.log("got token--",url,token)
        token = token.replace(/^Bearer\s+/, "").replace(/^x-access-token\s+/, "");
    }
    jwt.verify(token, config.secret_key, function (err, decoded) {
        if (err){
            console.log(err,"jwt error")
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        // if everything good, save to request for use in other routes
        if (decoded.type){
            req.userType = decoded.type
        }else{
            req.userType = "client"
        }
        req.userID = decoded.user;
        req.userName = decoded.name;
        req.db = "loygift" + decoded.id;
        next();
    });
}

module.exports = verifyToken;