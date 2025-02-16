const db = require('../models/index');

const getFacilities = async (req, res) => {
  let facilities;
  const type = req.query.type;
  console.log(`----------------------${type}`);

  try {
    facilities = await db.hotel_facilities.findAll({
      where: {
        type: type,
      },
    });
  } catch (error) {
    res.status(404);
  }

  res.status(200).json({ facilities });
};

module.exports = {
  getFacilities,
};
