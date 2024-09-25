const CustomError = require('../errors');
const jwt = require('jsonwebtoken');
const db = require('../models/index');

const UnauthenticatedError = require('../errors/unauthenticated');

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.user_id;

    const user = await db.korisnik.findOne({
      where: { user_id: userId },
    });

    if (!user) throw new UnauthenticatedError('Korisnik ne postoji');

    req.userId = userId;
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
