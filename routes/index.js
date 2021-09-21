// root index for routes

const expresss = require('express');

const router = expresss.Router();

const passport = require('passport');

const homeController = require('../controllers/home_controller')

const paymentController = require('../controllers/payment_controller');

const successfulController = require('../controllers/successful_controller');

const userController = require('../controllers/users_controller');

const otpController = require('../controllers/otp_controller');

const otp2Controller = require('../controllers/otp2_controller');

router.get('/',homeController.home);

// router.use('/user',require('./users'));

router.get('/Signin',userController.signIN);

router.get('/Signup',userController.signUP);

// post is for action after entering data
router.post('/create',userController.create);

// use passportt as MW to authenticate
router.post('/create-session',passport.authenticate
(
    // if authenticated then done , if fails then user redirected to sign in
    'local',
    {failureRedirect: '/Signin'},
    // if done then createSession is executed
),userController.createSession);


router.get('/Signout',userController.destroySession);

router.get('/payment',paymentController.payment);

router.get('/otp',otpController.otp);

router.get('/otp2',otp2Controller.otp2);

router.get('/successful',successfulController.transaction);


// google Oauth routes
router.get('/auth/google', passport.authenticate('google', { scope:[ 'profile', ' email']}));

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/Signup'}), userController.createSession);

module.exports = router;