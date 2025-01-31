const db = require('../models/index');

const pagination = async (req, res) => {
  const { page, page_size } = req.query;

  const limit = parseInt(req.query.page_size);
  const offset = (page - 1) * page_size;

  const { count, rows } = await db.hotel.findAndCountAll({
    limit: limit,
    offset: offset,
  });

  // const data = await db.hotel.findAll();
  // res.status(200).json({ limit });

  res.status(200).json({ count, rows });
};

module.exports = { pagination };
