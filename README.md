## Introduction
We will going to talk about organizing node.js project in a structured way.

Organized project structure reduces bugs & delicacy, Increases the stability & scalability of the code.

## The Structure
```
|--app.js
|--api-routes
|--app
|--config
|--jobs
|--loaders
|--node_modules
|--public
|--secrets
|--services
|--views
|--package-lock.json
|--package.json
```
### 1. app.js
app.js is the entry point or heart of the node.js application
```
//app.js
const express = require('express');
const app     = express();

require('./loaders/network-information.js');
require('./api-routes/home.js')(app);
require('./jobs/say-hello.js');
var config = require('./config/config.js');

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.listen(config.port, () => {
  console.log(`App listening at http://localhost:${config.port}`);
})
```

### 2. api-routes
api-routes contain URL endpoints, which help users to interact with the application.
```
|--api-routes
   |--home.js
```
```
//home.js
var analytics = require('../services/analytics.js');
module.exports = function(app, network_information){    
    app.get('/', function(req, res){
        res.render('home.ejs', {key: "You have visited this page "+analytics.visitCounter()+" times"});
    });    
}
```

### 3. app
app contains models of databas and controllers to work with them.
```
|--app
   |--controllers
   |--models
```

### 4. config
This folder contains files that are used to configure the parameters & initial settings for application. They can be overridden & extended by Environment Variables, Command Line Parameters, or External Sources
```
|--config
   |--config.js
```
```
//config.js
module.exports = {    
    port: process.env.PORT || 80
};
``` 

### 5. Jobs
jobs folder contains scripts that will execute themselves automatically at a particular time
Just like, Here we have created a script which prints "Hello" every hour a day.
```
|--jobs
  |--say-hello.js
```
```
//say-hello.js
var schedule = require('node-schedule');     

schedule.scheduleJob('00 * * * *', function(){
    console.log('Hello World, This scheduler will say "Hello" every hour to you');
});
```

### 6. loaders
loaders contains the type of scripts that will execute at the time server starts.
Just like, Here we are fetching user's *IP Address* whenever server starts
```
|--loaders
   |--network-information.js
```
```
//network-information.js
const http = require('http');

http.get('http://api.ipify.org?format=json', (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;    
  });
  
  resp.on('end', () => {    
    console.log("Your IP address is "+JSON.parse(data).ip)
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
```


### 7. secrets
You can store all your secrets related to web application such as API-KEY, AUTHENTICATION-KEY, etc.
```
|--secrets
   |--keys.json
```
```
//keys.json
{
    "api-key": "HUH121NVYTB091BHHBCR121DR"
}
```

### 8. services
services contains set of modules which performs a specific task. They can be used over & over again.
```
|--services
   |--anaytics.json
```
```
//analytics.json
var i = 0;
function visitCounter()
{
    i = i + 1;
    return i;
}

module.exports = {
    visitCounter: visitCounter
}
```

### 9. views
It contains **Frontend part** files, and main index.html file as an entry point.

```
|--views
   |--frontend
   |--index.html
```
```
//index.html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
      <!-- CSS only -->
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

## Conclusion
Organized folder structure reduces the code complexity & increases the scalability of application.
