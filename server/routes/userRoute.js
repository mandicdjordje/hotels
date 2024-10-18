const express = require('express');
const router = express.Router();

const {
  createHotelAdmin,
  removeAdmin,
  prikaziSveAdmineSaHotelima,
} = require('../controllers/userController');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentification');

router.put(
  '/createHotelAdmin',
  authenticateUser,
  authorizePermissions('ADMIN_ROOT'),
  createHotelAdmin
);

router.put(
  '/removeAdmin',
  authenticateUser,
  authorizePermissions('ADMIN_ROOT'),
  removeAdmin
);

router.get(
  '/getAllAdmins',
  authenticateUser,
  authorizePermissions('ADMIN_ROOT'),
  prikaziSveAdmineSaHotelima
);

module.exports = router;
