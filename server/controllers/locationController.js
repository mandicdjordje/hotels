require("dotenv").config();
const express = require("express");
const axios = require("axios");
const { json } = require("body-parser");

const app = express();

const fetchCountris = async (req, res) => {
  const { name } = req.query;

  try {
    const response = await axios.get(`https://restcountries.com/v3.1/all`);
    const countries = response.data
      .filter((country) =>
        country.name.common.toLowerCase().includes(name.toLowerCase())
      )
      .map((country) => ({
        name: country.name.common,
        code: country.cca2,
      }));
    res.status(200).json({ countries });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Nije uspelo naci Drzavu pod nazivom ${name}` });
  }
};

const fecthCitiesFromCountries = async (req, res) => {
  try {
    const response = await axios.get(`http://api.geonames.org/searchJSON`, {
      params: {
        country: "RS",
        featureClass: "P", // 'P' označava naseljena mesta (gradove)
        maxRows: 200, // Maksimalan broj gradova
        username: process.env.GEONAMES_USERNAME,
      },
    });

    const cities = response.data.geonames.map((city) => ({
      name: city.name,
      postalCode: city.postalcode || "N/A",
      population: city.population || 0,
    }));

    data = { country: "RS", cities };

    data.cities
      .filter((city) => city.population >= 5000)
      .sort((a, b) => b.population - a.population);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Greška pri dobavljanju podataka" });
  }
};
module.exports = { fetchCountris, fecthCitiesFromCountries };
