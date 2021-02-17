
const mongoose = require("mongoose");

const clientOption = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    poolSize: 50,
    useNewUrlParser: true,
    autoIndex: false,
    useUnifiedTopology: true
};
const option = { useNewUrlParser: true };

const initClientDbConnection = () => {
    const db = mongoose.createConnection('mongodb://localhost/', clientOption);

    db.on("error", console.error.bind(console, "MongoDB Connection Error>> : "));
    db.once("open", function () {
        console.log("client MongoDB Connection ok!");
    });
    require("../app/models/client.js")
    require("../app/models/category.js")
    require("../app/models/product.js")
    require("../app/models/review.js")
    require("../app/models/promocode.js")
    return db;
};

module.exports = {
    initClientDbConnection
};