module.exports = (sequelize, DataTypes) => {
  const Room_accessories = sequelize.define(
    'room_accessories',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tv: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      bedside_lamp: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      alarm_clocks: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      television: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      mini_bar: {
        type: DataTypes.BOOLEAN,
      },
      coffie_maker: {
        type: DataTypes.BOOLEAN,
      },
      slipper_bathrobe: {
        type: DataTypes.BOOLEAN,
      },
      toiletries: {
        type: DataTypes.BOOLEAN,
      },
      ironing_boards: {
        type: DataTypes.BOOLEAN,
      },
      stationery_kits: {
        type: DataTypes.BOOLEAN,
      },
    },
    { freezeTableName: true }
  );
  return Room_accessories;
};
