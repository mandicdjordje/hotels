const db = require('../models/index');
const CustomError = require('../errors/index');
const { Op } = require('sequelize');

const createHotel = async (req, res) => {
  const {
    state = null,
    city = null,
    address = null,
    postalCode,
  } = req.body.location;
  const { name = null, number_of_rooms = 10 } = req.body.hotel;

  const proveraLokacije = await db.location.findOne({
    where: {
      city,
      address,
    },
  });

  if (proveraLokacije) {
    return res.status(406).json({ massage: 'Lokacija vec postoji' });
  }

  let location;
  let hotel = {};

  if (state && city && address && postalCode && name && number_of_rooms) {
    location = await db.location.create({
      state,
      city,
      address,
      postalCode,
    });
    hotel = await db.hotel.create({
      name,
      number_of_rooms,
      location_id: location.dataValues.location_id,
    });
  } else {
    return res.status(400).json({
      massage: 'Niste uneli podatke za kreiranje hotela ili lokacije',
    });
  }

  res.status(201).json({ hotel });
};

const getAllHotels = async (req, res) => {
  try {
    const hotels = await db.hotel.findAll();
    return res.status(200).json({ hotels });
  } catch (error) {
    res.status(400).json({ message: 'Nije uspesno izlistati hotele' });
  }
};

const getHotelsbyName = async (req, res) => {
  const name = req.body.name;

  if (name.length <= 3) {
    res.status(400).json({ message: 'Unesite minimum 4 karaktera' });
  }

  console.log('___________________________' + name);

  let hoteli;
  try {
    hoteli = await db.hotel.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
  } catch (e) {
    res.status(400).json({ message: 'Doslo je do greske prilikom pretrage' });
  }

  if (hoteli.length === 0) {
    res.status(400).json({ message: 'Trenutno nema hotela' });
  }

  res.status(200).json({ hoteli });
};

const searchForHotels = async (req, res) => {
  const { name } = req.params;

  const hotels = await db.hotel.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`,
      },
    },
    include: [
      { model: db.location },
      { model: db.facilities, through: { attributes: [] } },
    ],
  });

  console.log(name);

  res.status(200).json({ hotels });
};

module.exports = {
  createHotel,
  getAllHotels,
  getHotelsbyName,
  searchForHotels,
};
