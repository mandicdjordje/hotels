const express = require('express');
const router = express.Router();

const { createHotel, getAllHotels } = require('../controllers/hotelController');

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

module.exports = router;
