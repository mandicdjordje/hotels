const db = require('../models/index');
const CustomError = require('../errors/index');

const createReservation = async (req, res) => {
  const { start_date, end_date } = req.body;

  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  if (startDate > endDate) {
    res.status(400).json({ message: 'Nije dobro uneto vreme' });
  }

  let proveraSobeZaTermin = await db.reservation.findAll({
    where: {
      user_id: req.userId,
    },
  });

  for (let i = 0; i < proveraSobeZaTermin.length; i++) {
    // console.log(proveraSobeZaTermin[i].start_date);
    console.log(startDate);

    if (
      endDate > proveraSobeZaTermin[i].start_date &&
      endDate <= proveraSobeZaTermin[i].end_date
    ) {


      res.status(400).json({message:""})
    }
  }

  // let reservation;
  // try {
  //   reservation = await db.reservation.create({
  //     start_date: startDate,
  //     end_date: endDate,
  //     room_id: Number(req.params.room_id),
  //     user_id: req.userId,
  //   });
  // } catch (error) {
  //   res.status(400).json({ message: 'Nije moguce napraviti rezervaciju' });
  // }

  res.status(200).json({ proveraSobeZaTermin });
  // res.status(200).json({ reservation });
};

module.exports = { createReservation };
