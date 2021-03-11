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
    secret_key: 'sasdfsdfasdfh'
};