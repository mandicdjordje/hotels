module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    'room',
    {
      room_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.ENUM([
          'one_bed_room',
          'two_bed_room',
          'three_bed_room',
          'four_bed_room',
          'presidential_suite',
        ]),
        defaultValue: 'two_bed_room',
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
    },
    { freezeTableName: true }
  );
  return Room;
};
