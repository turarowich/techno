var jwt = require('jsonwebtoken');
var config = require('../config/config');
function verifyToken(req, res, next) {

    // Header names in Express are auto-converted to lowercase
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    let validWithoutToken = ['/searchPromocodeByCodeApi','/getSettings','/getProducts', '/getNews', '/getCategories?type=product', '/getCategories',
        '/adminLogin','/getCompanies']
    let url = '/'+req.path.split('/')[1]
    console.log(`-|-|-|-|-|-|-VERIFY TOKEN MIDD|-|-${url}-|-|-|-|-|-|-|-|-|`);
    // let tokenAdmin = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token || token.includes('null')){
        console.log("No token",url)
        if (req.headers['access-place'] && validWithoutToken.includes(url)){
            req.db = 'loygift' + req.headers['access-place']
            return next();
        }else if(req.headers['x-admin']){
            if(validWithoutToken.includes(url)) return next();
            let tokenAdmin = req.headers['x-admin-token'];
            if(!tokenAdmin){
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            jwt.verify(tokenAdmin, config.secret_key, function (err, decoded) {
                console.log(decoded,"DECODED TOKEN A")
                if (err){
                    console.log(err,"jwt error")
                    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                }else{
                    console.log("next")
                    return next();
                }
            }).catch(er=>{
                console.log(er,"CATCH")
            });
        }
        console.log("NEIN")
        return res.status(403).send({ auth: false, message: 'No token provided.45' });
    }else{
        // Remove Bearer from string
        console.log("got token--",url,token)
        token = token.replace(/^Bearer\s+/, "").replace(/^x-access-token\s+/, "");
    }
    jwt.verify(token, config.secret_key, function (err, decoded) {
        console.log(decoded,"DECODED TOKEN")
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
        console.log("passed");
        next();
    });
}

module.exports = verifyToken;