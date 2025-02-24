const db = require('../models/index');
const { Op } = require('sequelize');

const hotelPagination = async (req, res) => {
  const { page, page_size, search } = req.query;

  const limit = parseInt(req.query.page_size);
  const offset = (page - 1) * page_size;

  let { count, rows } = await db.hotel.findAndCountAll({
    limit: limit,
    offset: offset,
    distinct: true,
    include: [
      { model: db.location },
      { model: db.facilities, through: { attributes: [] } },
    ],
    where: search
      ? {
          name: {
            [Op.like]: `%${search}%`,
          },
        }
      : {},
  });

  res.status(200).json({ count, data: rows });
};

const facilitiesPagination = async (req, res) => {
  const { page, page_size } = req.query;
  let { type } = req.query;

  if (type !== 'hotel' && type !== 'room') {
    type = 'hotel';
  }

  const limit = parseInt(req.query.page_size);
  const offset = (page - 1) * page_size;

  let { count, rows } = await db.facilities.findAndCountAll({
    limit: limit,
    offset: offset,

    where: {
      type: type,
    },
  });
  // const data = await db.facilities.findAll({
  //   where: {
  //     type: type,
  //   },
  // });

  // res.status(200).json({ data });
  res.status(200).json({ count, data: rows });

  // res.status(200).json({ success: true });
};

module.exports = { hotelPagination, facilitiesPagination };
