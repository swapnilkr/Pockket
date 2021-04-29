// root index for routes

const expresss = require('express');

const router = expresss.Router();

const homeController = require('../controllers/home_controller')

const paymentController = require('../controllers/payment_controller');

router.get('/',homeController.home);

// router.use('/user',require('./users'));

router.get('/payment',paymentController.payment);


module.exports = router;