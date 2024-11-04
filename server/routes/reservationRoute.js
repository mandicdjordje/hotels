const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentification');

const {
  createReservation,
  getAllReservations,
} = require('../controllers/reservationController');

router.post(
  '/create/:room_id',
  authenticateUser,
  authorizePermissions('USER', 'ADMIN_HOTELA'),
  createReservation
);

router.get('/getAll', getAllReservations);

module.exports = router;
