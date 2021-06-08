var config = require('./config');
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

const db_admin_name = config.admin;
const db_admin_password = config.password;
const initClientDbConnection = () => {
    mongoose.set('useFindAndModify', false);
    const db = mongoose.createConnection(`mongodb://${db_admin_name}:${db_admin_password}@127.0.0.1:27017/admin`, clientOption);

    require("../app/models/client.js")
    require("../app/models/category.js")
    require("../app/models/product.js")
    require("../app/models/review.js")
    require("../app/models/promocode.js")
    require("../app/models/order.js")
    require("../app/models/order_product.js")
    require("../app/models/user.js")
    require("../app/models/message.js")
    require("../app/models/news.js")
    require("../app/models/service.js")
    require("../app/models/cashback.js")
    require("../app/models/device.js")
    require("../app/models/bekaDiscounts.js")
    require("../app/models/delivery.js")
    require("../app/models/branch.js")
    require("../app/models/settings.js")
    require("../app/models/catalogs.js")
    return db;
};

module.exports = {
    initClientDbConnection
};