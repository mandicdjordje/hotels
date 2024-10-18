const db = require('../models/index');
const CustomError = require('../errors/index');
const { where, NUMBER } = require('sequelize');
const { Op } = require('sequelize');

const createHotelAdmin = async (req, res) => {
  const { city, address } = req.body.location;
  const { name } = req.body.hotel;
  const { email } = req.body.korisnik;

  let location = {};
  try {
    location = await db.location.findOne({
      where: {
        city,
        address,
      },
    });
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Lokacija sa unetim podacima nije dostupna' });
  }

  let hotel = {};
  try {
    hotel = await db.hotel.findOne({
      where: {
        name,
        location_id: location.location_id,
      },
    });
  } catch (error) {
    res.status(400).json({ message: 'Lokacija ili ime hotela nisu ispravni' });
  }

  if (hotel.admin_id !== null) {
    res.status(400).json({ message: 'hotel vec ima administratora' });
  }

  let korisnik = {};
  try {
    korisnik = await db.korisnik.findOne({
      where: {
        email,
      },
    });
  } catch (error) {
    res.status(404).json({ message: 'korisnik sa emailom nije dostupan' });
  }

  if (korisnik.role === 'ADMIN_HOTELA') {
    res.status(406).json({
      message: `korisnik je vec administrator hotela pod nazivom ${hotel.name}`,
    });
  }
  await db.korisnik.update(
    { role: 'ADMIN_HOTELA' },
    {
      where: {
        email,
      },
    }
  );

  await db.hotel.update(
    { admin_id: korisnik.user_id },
    {
      where: {
        name,
        location_id: location.location_id,
      },
    }
  );

  res.status(202).json({ success: true });
};
const removeAdmin = async (req, res) => {
  const { email } = req.body;

  const adminHotela = await db.korisnik.findOne({
    where: { email, role: 'ADMIN_HOTELA' },
  });

  if (!adminHotela) {
    res
      .status(404)
      .json({ message: `Korisnik sa emailom ${email} ne postoji` });
  }

  const hotel = await db.hotel.update(
    { admin_id: null },
    { where: { admin_id: adminHotela.user_id } }
  );

  await db.korisnik.update({ role: 'USER' }, { where: { email } });

  res.status(200).json({ message: 'Uspesno uklonjen admin' });
};

const prikaziSveAdmineSaHotelima = async (req, res) => {
  let hoteli;
  try {
    hoteli = await db.hotel.findAll({
      where: {
        admin_id: {
          [Op.ne]: null,
        },
      },
    });
  } catch (error) {
    res.status(400).json({ message: 'Trenutno nem admina' });
  }

  let hoteliSaAdminom = {};
  let Admin;
  let hotelSaAdminom;
  for (let i = 0; i < hoteli.length; i++) {
    try {
      Admin = await db.korisnik.findOne({
        where: { user_id: hoteli[i].admin_id },
      });
    } catch (error) {
      res.status(400).json({ message: 'nema Admina' });
    }
    let hotel = hoteli[i];

    hotelSaAdminom = { Admin, hotel };

    hoteliSaAdminom[i] = hotelSaAdminom;
  }

  console.log(hoteliSaAdminom);

  res.status(200).json({ hoteliSaAdminom });
};


module.exports = { createHotelAdmin, removeAdmin, prikaziSveAdmineSaHotelima };
