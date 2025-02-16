module.exports = (sequelize, DataTypes) => {
  const Hotel_facilities = sequelize.define('facilities', {
    facilitie_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM('hotel', 'room'),
    },
  });

  return Hotel_facilities;
};
