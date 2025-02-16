const db = require('../models/index');
const { Op } = require('sequelize');

const pagination = async (req, res) => {
  const { page, page_size, search } = req.query;

  const limit = parseInt(req.query.page_size);
  const offset = (page - 1) * page_size;

  let { count, rows } = await db.hotel.findAndCountAll({
    limit: limit,
    offset: offset,
    distinct: true,
    include: [
      { model: db.location },
      { model: db.hotel_facilities, through: { attributes: [] } },
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

module.exports = { pagination };
