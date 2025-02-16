const express = require('express');
const router = express.Router();

const {
  createHotel,
  getAllHotels,
  getHotelsbyName,
  searchForHotels,
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
router.get('/search/:name', searchForHotels);


module.exports = router;
