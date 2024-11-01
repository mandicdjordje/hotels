const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentification');

const { createReservation } = require('../controllers/reservationController');

router.post(
  '/create/:room_id',
  authenticateUser,
  authorizePermissions('USER'),
  createReservation
);

module.exports = router;
