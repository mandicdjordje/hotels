const db = require('../models/index');
const { where, Op } = require('sequelize');
const CustomError = require('../errors/index');

const createReservation = async (req, res) => {
  const { start_date, end_date } = req.body;
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  if (startDate > endDate) {
    res.status(400).json({ message: 'Nije dobro uneto vreme' });
  }

  let existingReservationsIninterval = await db.reservation.findAll({
    where: {
      room_id: req.params.room_id,
      [Op.or]: {
        start_date: {
          [Op.between]: [startDate, endDate],
        },
        end_date: {
          [Op.between]: [startDate, endDate],
        },
        [Op.and]: {
          start_date: { [Op.lte]: startDate },
          end_date: { [Op.gte]: endDate },
        },
      },
    },
  });

  console.log('blablabla', existingReservationsIninterval);

  if (existingReservationsIninterval?.length) {
    return res.status(400).json({
      message: 'Nije uspesna rezervacija sobe jer je soba vec rezervisana',
    });
  }

  // for (let i = 0; i < proveraSobeZaTermin.length; i++) {

  //   if (
  //     (endDate > proveraSobeZaTermin[i].start_date &&
  //       endDate <= proveraSobeZaTermin[i].end_date) ||
  //     (startDate < proveraSobeZaTermin[i].end_date &&
  //       startDate > proveraSobeZaTermin[i].start_date) ||
  //     (proveraSobeZaTermin[i].start_date === startDate &&
  //       proveraSobeZaTermin[i].end_date === endDate)
  //   ) {
  //     return res.status(400).json({
  //       message: 'Nije uspesna rezervacija sobe jer je soba vec rezervisana',
  //     });
  //   }
  // }

  let reservation;
  try {
    reservation = await db.reservation.create({
      start_date: startDate,
      end_date: endDate,
      room_id: Number(req.params.room_id),
      user_id: req.userId,
    });
  } catch (error) {
    res.status(400).json({ message: 'Nije moguce napraviti rezervaciju' });
  }

  res.status(200).json({ reservation });
  // res.status(200).json({ reservation });
};

const getAllReservations = async (req, res) => {
  let rezervacije = await db.reservation.findAll();

  if (!rezervacije.length) {
    res.status(400).json({ message: 'Nema rezervacija' });
  }

  res.status(200).json({ rezervacije });
};

module.exports = { createReservation, getAllReservations };
