const { Sequelize, DataTypes, Op, DATE } = require('sequelize');
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
db.facilities = require('./HotelFacilitiesModel')(sequelize, DataTypes);
db.room = require('./RoomModel')(sequelize, DataTypes);
db.location = require('./LocationModel')(sequelize, DataTypes);
db.hotel_event_space = require('./HotelEventSpaceModel')(sequelize, DataTypes);
db.reservation = require(`./ReservationModel`)(sequelize, DataTypes);

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

// Veze izmedju modela

db.hotel.hasMany(db.room, {
  foreignKey: 'hotel_id',
});
db.room.belongsTo(db.hotel, {
  foreignKey: 'hotel_id',
});

db.location.hasOne(db.hotel, {
  foreignKey: {
    name: 'location_id',
  },
});
db.hotel.belongsTo(db.location, {
  foreignKey: {
    name: 'location_id',
  },
});

db.korisnik.hasMany(db.hotel, {
  foreignKey: 'admin_id',
});
db.hotel.belongsTo(db.korisnik, {
  foreignKey: 'admin_id',
});

db.korisnik.hasMany(db.reservation, {
  foreignKey: 'user_id',
});
db.reservation.belongsTo(db.korisnik, {
  foreignKey: `user_id`,
});

db.room.hasMany(db.reservation, {
  foreignKey: 'room_id',
});
db.reservation.belongsTo(db.room, {
  foreignKey: `room_id`,
});

db.hotel.belongsToMany(db.facilities, {
  through: 'hotelFacilities',
  foreignKey: 'hotel_id',
});
db.facilities.belongsToMany(db.hotel, {
  through: 'hotelFacilities',
  foreignKey: 'facilitie_id',
});

db.facilities.hasOne(db.hotel_event_space, {
  foreignKey: {
    name: 'facilitie_id',
  },
});
db.hotel_event_space.belongsTo(db.facilities, {
  foreignKey: {
    name: 'facilitie_id',
  },
});

module.exports = db;
