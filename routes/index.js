// root index for routes

const expresss = require('express');

const router = expresss.Router();

const homeController = require('../controllers/home_controller')

const paymentController = require('../controllers/payment_controller');

const successfulController = require('../controllers/successful_controller');

router.get('/',homeController.home);

// router.use('/user',require('./users'));

router.get('/payment',paymentController.payment);

router.get('/successful',successfulController.transaction);

module.exports = router;