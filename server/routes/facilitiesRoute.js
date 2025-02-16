const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentification');

const { getFacilities } = require('../controllers/facilitiesController');

router.get('/', getFacilities);

module.exports = router;
