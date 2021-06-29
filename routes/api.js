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

var multer = require('multer');
var upload = multer({ dest: '../public/product/' });
module.exports = function (app, network_information) {
    //Clients url
    app.get('/getClient/:client', clientController.getClient);
    app.get('/getClients', clientController.getClients);
    app.post('/addClient', clientController.addClient);
    app.put('/updateClient/:client', clientController.updateClient);
    app.put('/updateClientsCategory', clientController.updateClientsCategory);
    app.delete('/deleteClient/:client', clientController.deleteClient);
    app.delete('/deleteClients', clientController.deleteClients);
    app.post('/addClientDevice', clientController.addClientDevice);
    app.get('/updatedMessagesStatus/:client', clientController.updatedMessagesStatus);
    app.post('/clearMessages', clientController.clearMessages);
    app.post('/getNewMessages', clientController.getNewMessages);
    app.post('/addPoints', clientController.addPoints);
    app.post('/deductPoints', clientController.deductPoints);
    
    // Products url
    app.get('/getProduct/:product', productController.getProduct);
    app.get('/getProducts', productController.getProducts);
    app.post('/getProductExcel', productController.getProductExcel);
    app.post('/getProductImportExcel', productController.getProductImportExcel);
    app.post('/addProduct', upload.single('file'), productController.addProduct);
    app.put('/updateProduct/:product', upload.single('file'), productController.updateProduct);
    app.put('/updateProductsCategory', productController.updateProductsCategory);


    app.delete('/deleteProduct/:product', productController.deleteProduct);
    app.delete('/deleteProducts', productController.deleteProducts);
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
    app.post('/addCategory', categoryController.addCategory);
    app.put('/updateCategory/:category', categoryController.updateCategory);
    app.delete('/deleteCategory/:category', categoryController.deleteCategory);

    // Promocode url
    app.get('/getPromocode', promocodeController.getPromocode);
    app.get('/getPromocodes', promocodeController.getPromocodes);
    app.post('/addPromocode', promocodeController.addPromocode);
    app.post('/updatePromocode', promocodeController.updatePromocode);
    app.delete('/deletePromocode/:promocode', promocodeController.deletePromocode);
    app.get('/searchProductService', promocodeController.searchProductService);
    app.get('/searchPromocode', promocodeController.searchPromocode);
    app.get('/searchPromocodeByCode', promocodeController.searchPromocodeByCode);

    // Cashback url
    app.get('/getCashback', cashbackController.getCashback);
    app.post('/updateCashback/:id', cashbackController.updateCashback);
    // Discount url
    app.post('/addDiscount', discountController.addDiscount);
    app.get('/getDiscounts', discountController.getDiscounts);
    app.delete('/deleteDiscount/:id', discountController.removeDiscount);
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
    app.put('/updateOrder/:order', orderController.updateOrder);
    app.delete('/deleteOrder/:order', orderController.deleteOrder);
    app.delete('/deleteOrders', orderController.deleteOrders);
    app.post('/getOrderExcel', orderController.getOrderExcel);


    // News url
    app.get('/getSingleNews/:news', newsController.getSingleNews);
    app.get('/getNews', newsController.getNews);
    app.post('/addNews', newsController.addNews);
    app.put('/updateNews/:news', newsController.updateNews);
    app.delete('/deleteNews/:news', newsController.deleteNews);

    // User url
    app.get('/getUser/:order', userController.getUser);
    app.get('/getUsers', userController.getUsers);
    app.put('/updateUser/:user', userController.updateUser);
    app.delete('/deleteUser/:user', userController.deleteUser);

    // User url
    app.get('/sendNewsPN/:id', pushController.sendNewsPN);

    // Settings url
    app.get('/getSettings', settingsController.getSettings);
    app.get('/getPersonalSettings', settingsController.getPersonalSettings);
    app.put('/updateSettings', settingsController.updateSettings);
    app.delete('/deleteDelivery/:delivery', settingsController.deleteDelivery);
    app.delete('/deleteBranch/:branch', settingsController.deleteBranch);
    app.post('/addBranch', settingsController.addBranch);
    app.get('/getBranch', settingsController.getBranch);
    app.post('/updateBranch', settingsController.updateBranch);
    app.post('/addDeliveryOption', settingsController.addDeliveryOption);
    app.get('/getDeliveryOption', settingsController.getDeliveryOption);
    app.post('/updateDeliveryOption', settingsController.updateDeliveryOption);
    app.put('/generateQrCodeFile', settingsController.generateQrCodeFile);
    app.put('/saveSettingsFile', settingsController.saveSettingsFile);

    //Employees url
    app.get('/getEmployee/:employee', employeeController.getEmployee);
    app.get('/getEmployees', employeeController.getEmployees);
    app.post('/addEmployee', employeeController.addEmployee);
    app.put('/updateEmployee/:employee', employeeController.updateEmployee);
    app.put('/updateEmployees', employeeController.updateEmployees);
    app.post('/deleteEmployees', employeeController.deleteEmployees);


    //Analytics url
    app.get('/getAnalytics', analyticsController.getAnalytics);

    return app;
}