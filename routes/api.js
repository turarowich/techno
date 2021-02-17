var clientController = require('../app/controllers/clientController');
var productController = require('../app/controllers/productController');
var promocodeController = require('../app/controllers/promocodeController');
var categoryController = require('../app/controllers/categoryController');
var reviewController = require('../app/controllers/reviewController');

module.exports = function (app, network_information) {
    //Clients url
    app.get('/getClient/:client', clientController.getClient);
    app.get('/getClients', clientController.getClients);
    app.post('/addClient', clientController.addClient);
    app.put('/updateClient/:client', clientController.updateClient);
    app.delete('/deleteClient/:client', clientController.deleteClient);
    
    // Products url
    app.get('/getProduct/:product', productController.getProduct);
    app.get('/getProducts', productController.getProducts);
    app.post('/addProduct', productController.addProduct);
    app.put('/updateProduct/:product', productController.updateProduct);
    app.delete('/deleteProduct/:product', productController.deleteProduct);

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

    return app;
}