const express = require('express');
const router = express.Router();

const {
  hotelPagination,
  facilitiesPagination,
} = require('../controllers/pagination');

router.get('/hotel', hotelPagination);
router.get('/facilities', facilitiesPagination);

module.exports = router;
