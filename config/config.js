var os = require('os');
var networkInterfaces = os.networkInterfaces();
module.exports = {    
    port_http: process.env.PORT || 8080,
    port_https: process.env.PORT || 8443,
    localhost:'localhost',
    ip: networkInterfaces['en0'][1]['address']
};