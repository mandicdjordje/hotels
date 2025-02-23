const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentification');

const { fetchCountris } = require('../controllers/locationController');

router.get('/countries', fetchCountris);

module.exports = router;
