const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentification");

const {
  fetchCountris,
  fecthCitiesFromCountries,
} = require("../controllers/locationController");

router.get("/countries", fetchCountris);

router.get("/cities", fecthCitiesFromCountries);

module.exports = router;
