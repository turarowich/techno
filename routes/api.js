var clientController = require('../app/controllers/clientController');
var productController = require('../app/controllers/productController');
var promocodeController = require('../app/controllers/promocodeController');
var categoryController = require('../app/controllers/categoryController');
var reviewController = require('../app/controllers/reviewController');
var orderController = require('../app/controllers/orderController');
var userController = require('../app/controllers/userController');
var newsController = require('../app/controllers/newsController');

var multer = require('multer');
var upload = multer({ dest: '../public/product/' });
module.exports = function (app, network_information) {
    //Clients url
    app.get('/getClient/:client', clientController.getClient);
    app.get('/getClients', clientController.getClients);
    app.post('/addClient', clientController.addClient);
    app.put('/updateClient/:client', clientController.updateClient);
    app.put('/updateClient/:client', clientController.updateClient);
    app.put('/updateClientsCategory', clientController.updateClientsCategory);
    app.delete('/deleteClient/:client', clientController.deleteClient);
    app.delete('/deleteClients', clientController.deleteClients);
    
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

    // Category url
    app.get('/getCategory/:category', categoryController.getCategory);
    app.get('/getCategories', categoryController.getCategories);
    app.post('/addCategory', categoryController.addCategory);
    app.put('/updateCategory/:category', categoryController.updateCategory);
    app.delete('/deleteCategory/:category', categoryController.deleteCategory);

    // Promocode url
    app.get('/getPromocode/:promocode', promocodeController.getPromocode);
    app.get('/getPromocodes', promocodeController.getPromocodes);
    app.post('/addPromocode', promocodeController.addPromocode);
    app.put('/updatePromocode/:promocode', promocodeController.updatePromocode);
    app.delete('/deletePromocode/:promocode', promocodeController.deletePromocode);
    
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

    return app;
}