const db = require('../models/index');
const CustomError = require('../errors/index');

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

module.exports = { createHotel, getAllHotels };
