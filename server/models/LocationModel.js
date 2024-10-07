module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'location',
    {
      location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addres: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { freezeTableName: true }
  );

  return Location;
};
