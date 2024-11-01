module.exports = (sequelize, DataTypes) => {
  const RoomRezervation = sequelize.define(
    'Rezervation',
    {
      rezervation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return RoomRezervation;
};
