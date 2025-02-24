require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();

const fetchCountris = async (req, res) => {
  // try {
  //   const response = await axios.get(`https://restcountries.com/v3.1/all`);
  //   const countries = response.data.map((country) => ({
  //     name: country.name.common,
  //     code: country.cca2,
  //   }));
  //   res.status(200).json(countries);
  // } catch (error) {
  //   res
  //     .status(500)
  //     .json({ error: 'Greška pri dobavljanju podataka o državama' });
  // }

  const { name } = req.query;

  console.log("-------------------"+name);
  
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
};

module.exports = { fetchCountris };
