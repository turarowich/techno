var address,
    ifaces = require('os').networkInterfaces();
for (var dev in ifaces) {
    ifaces[dev].filter((details) => details.family === 'IPv4' && details.internal === false ? address = details.address : undefined);
}
module.exports = {    
    port_http: process.env.PORT || 8080,
    port_https: process.env.PORT || 8443,
    localhost:'localhost',
    ip: address,
    secret_key: 'sasdfsdfasdfh',
    admin:'AdminMono',
    password:'123123123',
    privateKey: 'ssl/loygift.key',
    certificate: 'ssl/loygift.crt',
    FACEBOOK_CLIENT_ID: '1234',
    FACEBOOK_CLIENT_SECRET: '234113422143',
    FACEBOOK_CALLBACK_URL: 'http://localhost:8080/auth/facebook/callback',
};