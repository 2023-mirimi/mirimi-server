const express = require('express');
const router = express.Router();
const account = require('../controllers/account');

router.post('/login', account.login);
router.get('/user', account.getUser);
router.put('/user', account.editUser);

module.exports = router;