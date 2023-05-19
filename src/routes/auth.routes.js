const { Router } = require('express');
const router = Router();
const {
    login,
    signup
} = require('../controllers/auth.controller');
const {
    validateLogin,
    validateSignup
} = require('../validators/users.validators');

//login
router.post('/api/login', validateLogin, login);

//signup
router.post('/api/signup', validateSignup, signup);

module.exports = router;