const express = require('express');
const router = express.Router();

const {
  createHotel,
  getAllHotels,
  getHotelsbyName,
} = require('../controllers/hotelController');

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentification');

router.post(
  '/createHotel',
  authenticateUser,
  authorizePermissions('ADMIN_ROOT'),
  createHotel
);
router.get('/getAll', getAllHotels);
router.get(
  '/byName',
  authenticateUser,
  authorizePermissions('ADMIN_ROOT'),
  getHotelsbyName
);

module.exports = router;
