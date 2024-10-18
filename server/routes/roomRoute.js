const express = require('express');
const router = express.Router();

const { createRoom } = require('../controllers/roomController');

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentification');

router.post(
  '/create',
  authenticateUser,
  authorizePermissions('ADMIN_HOTELA'),
  createRoom
);

module.exports = router;
