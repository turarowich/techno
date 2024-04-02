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
    GOOGLE_CLIENT_ID:'1046986553977-ol122dlvr05g8fqsob89b20dnotk2p34.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET:'1-5OLYvevO_-5B8_9FxN3oOX',
    GOOGLE_CALLBACK_URL: 'http://localhost:8080/auth/google/callback',
    TWITTER_CONSUMER_KEY:'2COaXMimejAAhgtNKbP0OLh4W',
    TWITTER_SECRET_KEY:'o2xgzzJn5YXlmQnUs4KZAcaDm6centlvadyitvXXJsvDPZH56J',
    TWITTER_CALLBACK_URL: 'http://localhost:8080/auth/twitter/callback',
    APNs: 'AuthKey_YJ43RM8FP8.p8',
    APNsKeyID: 'YJ43RM8FP8',
    APNsTopic: 'Loyid',
    APNsTeamID: 'F64P295594',
    Shoes:'shoes',
    QRCODE_BASE:'http://localhost:8080', //NEW 12 16 23
};