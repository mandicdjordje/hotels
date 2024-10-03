module.exports = (sequelize, DataTypes) => {
  const hotel_event_space =
    ('hotel_event_space',
    {
      hotel_event_space_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      max_seats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 40,
      },
      price_seat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 50,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  return hotel_event_space;
};
