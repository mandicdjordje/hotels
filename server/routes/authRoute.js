const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentification');
router.post('/register', register);

router.post('/logIn', login);

router.get('/current', authenticateUser, authorizePermissions);

module.exports = router;
