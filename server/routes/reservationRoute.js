const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentification');

const {
  createReservation,
  getAllReservations,
  getHotelReservations,
} = require('../controllers/reservationController');

router.post(
  '/create/:room_id',
  authenticateUser,
  authorizePermissions('USER', 'ADMIN_HOTELA'),
  createReservation
);

router.get('/getAll', getAllReservations);

router.get('/hotel/getAll/:hotel_id', getHotelReservations);

module.exports = router;
