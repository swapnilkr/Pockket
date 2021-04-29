// root index for routes

const expresss = require('express');

const router = expresss.Router();

const homeController = require('../controllers/home_controller')

router.get('/',homeController.home);

const userController = require('../controllers/users_controller');

router.get('/',userController.users);

module.exports = router;