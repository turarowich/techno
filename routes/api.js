var clientController = require('../app/controllers/clientController');
var productController = require('../app/controllers/productController');
var serviceController = require('../app/controllers/serviceController');
var promocodeController = require('../app/controllers/promocodeController');
var categoryController = require('../app/controllers/categoryController');
var reviewController = require('../app/controllers/reviewController');
var orderController = require('../app/controllers/orderController');
var userController = require('../app/controllers/userController');
var newsController = require('../app/controllers/newsController');
var pushController = require('../app/controllers/pushController');
var cashbackController = require('../app/controllers/cashbackController');
var discountController = require('../app/controllers/discountController');
var settingsController = require('../app/controllers/settingsController');
var employeeController = require('../app/controllers/employeeController');
var analyticsController = require('../app/controllers/analyticsController');
var orderStatusController = require('../app/controllers/orderStatusController');
var logController = require('../app/controllers/logController');
var catalogController = require('../app/controllers/catalogController');
var multer = require('multer');
var upload = multer({ dest: '../public/product/' });
var verifyAccess = require('../services/verifyAccess');
var adminController = require('../app/controllers/adminController');
module.exports = function (app, io) {
    //Clients url
    app.get('/getClient/:client', clientController.getClient);
    app.get('/getClients', verifyAccess, clientController.getClients);
    app.post('/addClient', verifyAccess, clientController.addClient);
    app.put('/updateClient/:client', clientController.updateClient);
    app.post('/saveAvatar', clientController.saveAvatar);
    app.post('/checkPromocode', clientController.checkPromocode);
    app.put('/updateClientsCategory', verifyAccess, clientController.updateClientsCategory);
    app.delete('/deleteClient/:client', verifyAccess, clientController.deleteClient);
    app.delete('/deleteClients', verifyAccess, clientController.deleteClients);
    app.post('/addClientDevice', clientController.addClientDevice);
    app.get('/updatedMessagesStatus/:client', clientController.updatedMessagesStatus);
    app.post('/clearMessages', verifyAccess, clientController.clearMessages);
    app.post('/getNewMessages', clientController.getNewMessages);
    app.post('/addPoints', verifyAccess, clientController.addPoints);
    app.post('/deductPoints', verifyAccess, clientController.deductPoints);
    app.get('/getPoints', clientController.getPoints);
    app.delete('/deleteClientNews/:news', clientController.deleteClientNews);


    //Online menu
    app.post('/saveTempoOrder',  catalogController.saveTempoOrder);
    app.get('/getTempoOrder', catalogController.getTempoOrder);
    app.post('/updateTempoOrder', catalogController.updateTempoOrder);
    app.post('/updateProductTempoOrder', catalogController.updateProductTempoOrder);
    app.post('/removeProductTempoOrder', catalogController.removeProductTempoOrder);
    // Products url
    app.get('/getProduct/:product', productController.getProduct);
    app.get('/getProducts', productController.getProducts);
    app.post('/getProductExcel', verifyAccess, productController.getProductExcel);
    app.post('/getProductImportExcel', verifyAccess, productController.getProductImportExcel);
    app.post('/addProduct', upload.single('file'), productController.addProduct);
    app.put('/updateProduct/:product', verifyAccess, upload.single('file'), productController.updateProduct);
    app.put('/updateProductsCategory', verifyAccess, productController.updateProductsCategory);


    app.delete('/deleteProduct/:product', verifyAccess, productController.deleteProduct);
    app.delete('/deleteProducts', verifyAccess, productController.deleteProducts);
    app.get('/searchProduct', productController.searchProduct);


    // Service url
    app.get('/getService/:product', serviceController.getService);
    app.get('/getServices', serviceController.getService);
    app.post('/addService', upload.single('file'), serviceController.addService);
    // app.put('/updateService/:product', upload.single('file'), serviceController.updateProduct);
    // app.delete('/deleteService/:service', serviceController.deleteProduct);
    // app.delete('/deleteServices', serviceController.deleteProducts);
    // app.get('/searchService', serviceController.searchProduct);

    // Category url
    app.get('/getCategory/:category', categoryController.getCategory);
    app.get('/getCategories', categoryController.getCategories);
    app.post('/addCategory', verifyAccess, categoryController.addCategory);
    app.put('/updateCategory/:category', verifyAccess, categoryController.updateCategory);
    app.delete('/deleteCategory/:category', verifyAccess, categoryController.deleteCategory);

    // Promocode url
    app.get('/getPromocode', promocodeController.getPromocode);
    app.get('/getPromocodes', promocodeController.getPromocodes);
    app.post('/addPromocode', verifyAccess, promocodeController.addPromocode);
    app.post('/updatePromocode', verifyAccess, promocodeController.updatePromocode);
    app.delete('/deletePromocode/:promocode', verifyAccess, promocodeController.deletePromocode);
    app.delete('/deletePromocodes', verifyAccess, promocodeController.deletePromocodes);
    app.get('/searchProductService', promocodeController.searchProductService);
    app.get('/searchPromocode', promocodeController.searchPromocode);
    app.get('/searchPromocodeByCode', promocodeController.searchPromocodeByCode);
    app.get('/searchPromocodeByCodeApi', promocodeController.searchPromocodeByCode);

    // Cashback url
    app.get('/getCashback', cashbackController.getCashback);
    app.post('/updateCashback/:id', verifyAccess, cashbackController.updateCashback);
    // Discount url
    app.post('/addDiscount', verifyAccess, discountController.addDiscount);
    app.get('/getDiscounts', verifyAccess, discountController.getDiscounts);
    app.delete('/deleteDiscount/:id', verifyAccess, discountController.removeDiscount);
    // Review url
    app.get('/getReview/:review', reviewController.getReview);
    app.get('/getReviews', reviewController.getReviews);
    app.post('/addReview', reviewController.addReview);
    app.put('/updateReview/:review', reviewController.updateReview);
    app.delete('/deleteReview/:review', reviewController.deleteReview);

    // Order url
    app.get('/getOrder/:order', orderController.getOrder);
    app.get('/getOrders', orderController.getOrders);
    app.post('/addOrder', orderController.addOrder);
    app.put('/updateOrder/:order', verifyAccess, orderController.updateOrder);
    app.put('/updateOrderStatus/:order', verifyAccess, orderController.updateOrderStatus);
    app.delete('/deleteOrder/:order', verifyAccess, orderController.deleteOrder);
    app.delete('/deleteOrders', verifyAccess, orderController.deleteOrders);
    app.post('/getOrderExcel', verifyAccess, orderController.getOrderExcel);
    app.post('/addOderPoints', verifyAccess, orderController.addOderPoints);
    //Change Order status
    app.post('/updateOrderWeb', orderStatusController.create(io));
    app.post('/socketRooms', orderStatusController.rooms(io));

    // News url
    app.get('/getSingleNews/:news', newsController.getSingleNews);
    app.get('/getNews', newsController.getNews);
    app.post('/addNews', verifyAccess, newsController.addNews);
    app.put('/updateNews/:news', verifyAccess, newsController.updateNews);
    app.delete('/deleteNews/:news', verifyAccess, newsController.deleteNews);

    // User url
    app.get('/getUser/:order', userController.getUser);
    app.get('/getUsers', userController.getUsers);
    app.put('/updateUser/:user', verifyAccess, userController.updateUser);
    app.delete('/deleteUser/:user', verifyAccess, userController.deleteUser);

    // Push notification url
    app.get('/sendNewsPN/:id', pushController.sendNewsPN);
    app.post('/sendPushNotification', pushController.sendPushNotification);

    // Settings url
    app.get('/getSettings', settingsController.getSettings);
    app.get('/getPersonalSettings', settingsController.getPersonalSettings);
    app.put('/updateSettings', verifyAccess, settingsController.updateSettings);
    app.put('/updatePersonalSettings', verifyAccess, settingsController.updatePersonalSettings);
    app.delete('/deleteDelivery/:delivery', verifyAccess, settingsController.deleteDelivery);
    app.delete('/deleteBranch/:branch', verifyAccess, settingsController.deleteBranch);
    app.post('/addBranch', verifyAccess, settingsController.addBranch);
    app.get('/getBranch', verifyAccess, settingsController.getBranch);
    app.post('/updateBranch', verifyAccess, settingsController.updateBranch);
    app.post('/addDeliveryOption', verifyAccess, settingsController.addDeliveryOption);
    app.get('/getDeliveryOption',  settingsController.getDeliveryOption);
    app.post('/updateDeliveryOption', verifyAccess, settingsController.updateDeliveryOption);
    app.put('/generateQrCodeFile', settingsController.generateQrCodeFile);
    app.put('/saveSettingsFile', verifyAccess, settingsController.saveSettingsFile);

    //Employees url
    app.get('/getEmployee/:employee', employeeController.getEmployee);
    app.get('/getEmployees', employeeController.getEmployees);
    app.post('/addEmployee', verifyAccess, employeeController.addEmployee);
    app.put('/updateEmployee/:employee', verifyAccess, employeeController.updateEmployee);
    app.put('/updateEmployees', verifyAccess, employeeController.updateEmployees);
    app.post('/deleteEmployees', verifyAccess, employeeController.deleteEmployees);

    //Analytics url
    app.get('/getAnalytics', verifyAccess, analyticsController.getAnalytics);

    //Logs
    app.get('/getLogs', verifyAccess, logController.getLogs);

    // Shedule push
    app.get('/getSchedulePush/:object', verifyAccess, pushController.getSchedulePush);
    app.get('/getSchedulePushes', verifyAccess, pushController.getSchedulePushes);
    app.post('/addSchedulePush', verifyAccess, pushController.addSchedulePush);
    app.put('/updateSchedulePush/:object', verifyAccess, pushController.updateSchedulePush);
    app.delete('/deleteSchedulePush/:object', verifyAccess, pushController.deleteSchedulePush);
    app.post('/deleteSchedulePushes', verifyAccess, pushController.deleteSchedulePushes);

    //adminUrls
    app.post('/adminLogin', adminController.login);
    app.get('/getCompanies', adminController.getCompanies);
    app.get('/getAdminSettings', adminController.getAdminSettings);
    app.patch('/updateCompanyAccess/:id', adminController.updateCompanyAccess);
    app.patch('/updateCompany/:id', adminController.updateCompany);
    app.patch('/updateAdminSettings', adminController.updateAdminSettings);
    return app;
}