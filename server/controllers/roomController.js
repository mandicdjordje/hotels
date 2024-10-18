const db = require('../models/index');
const CustomError = require('../errors/index');

const createRoom = async (req, res) => {
  const { type, price, rating } = req.body.room;

  // let hotel;
  // try {
  //   hotel = await db.hotel.findOne({
  //     where: {
  //       admin_id: req.userId,
  //     },
  //   });
  // } catch (error) {
  //   res.status(400).json({ message: `hotel sa id-jem ${hotel_id} ne postoji` });
  // }

  // let sobeUHotelu;
  // try {
  //   sobeUHotelu = await db.room.findAll({
  //     where: {
  //       hotel_id: hotel.hotel_id,
  //     },
  //   });
  // } catch (error) {
  //   if (sobeUHotelu.length >= hotel.number_of_rooms) {
  //     res.status(400).json({ message: 'Nije moguce napraviti vise soba' });
  //   }
  // }

  let kreiranaSoba = await db.room.create({
    type,
    price,
    rating,
    hotel_id: hotel.hotel_id,
  });

  res.status(200).json({ kreiranaSoba });
};

module.exports = { createRoom };
