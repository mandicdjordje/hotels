const { Sequelize, DataTypes, Op } = require('sequelize');
const bcrypt = require('bcrypt');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
  }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log('connected..');
  })
  .catch((err) => {
    console.log('Error' + err);
  });

// IMPORTOVANJE MODELA
db.korisnik = require('./UserModel')(sequelize, DataTypes);
db.hotel = require('./HotelModel')(sequelize, DataTypes);
db.hotel_facilities = require('./HotelFacilitiesModel')(sequelize, DataTypes);
db.room = require('./RoomModel')(sequelize, DataTypes);
db.room_accessories = require('./RoomAccessoriesModel')(sequelize, DataTypes);

db.sequelize
  .sync()
  .then((data) => {
    console.log(`Table and model sync successfully`);
  })
  .catch((err) => {
    console.log('Error syncing the table and model');
  });

// Prototipe functions

db.korisnik.prototype.encryptPassword = async function (canditatePassword) {
  const salt = await bcrypt.genSalt(10);
  let encryptetPassword = await bcrypt.hash(canditatePassword, salt);
  console.log(encryptetPassword);
  return encryptetPassword;
};

db.korisnik.prototype.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = db;
