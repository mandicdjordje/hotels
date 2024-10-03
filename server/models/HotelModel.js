module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define(
    'hotel',
    {
      hotel_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );
  return Hotel;
};