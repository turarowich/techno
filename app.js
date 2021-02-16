const express = require('express');
const app     = express();

require('./loaders/network-information.js');
require('./routes/home.js')(app);
require('./routes/api.js')(app);
require('./jobs/say-hello.js');
var config = require('./config/config.js');

app.use(express.static('public'))

app.listen(config.port, () => {
  console.log(`App listening at http://localhost:${config.port}`);
})