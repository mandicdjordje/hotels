

module.exports = (sequelize, DataTypes) => {
  const Hotel_facilities = sequelize.define('hotel_facilities', {
    hotel_facilities_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    swiming_pool: {
      type: DataTypes.ENUM('indoor', 'outdoor', 'indoor and outdoor'),
    },
    fitness_center: {
      type: DataTypes.BOOLEAN,
    },
    spa: {
      type: DataTypes.BOOLEAN,
    },
    restoraunt: {
      type: DataTypes.BOOLEAN,
    },
    bar: {
      type: DataTypes.BOOLEAN,
    },
    parking: {
      type: DataTypes.BOOLEAN,
    },
    laundry: {
      type: DataTypes.BOOLEAN,
    },
    playground: {
      type: DataTypes.BOOLEAN,
    },
  });

  return Hotel_facilities;
};
